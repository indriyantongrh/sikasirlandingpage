# Hybrid: Firestore (Realtime) + Supabase (Reporting)

## Arsitektur

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Flutter App    │────▶│    Firestore     │────▶│ Cloud Functions │
│  (CRUD + RT)    │     │  (Primary DB)    │     │   (Trigger)     │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Admin Panel    │◀────│    Supabase      │◀────│   Sync Data     │
│  (Reporting)    │     │  (Analytics DB)  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Step 1: Setup Supabase Schema

Buat tables di Supabase yang mirror struktur Firestore.

```sql
-- Di Supabase SQL Editor

-- Users table (sync dari Firebase Auth + Firestore)
CREATE TABLE users (
  id UUID PRIMARY KEY, -- Firebase UID
  email TEXT,
  nama_lengkap TEXT,
  no_hp TEXT,
  role TEXT DEFAULT 'owner',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outlets table
CREATE TABLE outlets (
  id TEXT PRIMARY KEY, -- Firestore document ID
  user_id UUID REFERENCES users(id),
  nama_outlet TEXT NOT NULL,
  alamat TEXT,
  no_hp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pelanggan table
CREATE TABLE pelanggan (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  parent_user_id UUID,
  nama TEXT NOT NULL,
  no_hp TEXT,
  alamat TEXT,
  total_transaksi INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layanan table
CREATE TABLE layanan (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  outlet_id TEXT REFERENCES outlets(id),
  nama_layanan TEXT NOT NULL,
  nama_varian TEXT,
  harga DECIMAL(12,2) NOT NULL,
  satuan TEXT, -- kg, pcs, dll
  estimasi_hari INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table (main transaction)
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  nomor_order TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  parent_user_id UUID,
  kasir_id UUID,
  outlet_id TEXT REFERENCES outlets(id),
  pelanggan_id TEXT REFERENCES pelanggan(id),
  nama_pelanggan TEXT,
  
  -- Status
  status_order TEXT DEFAULT 'antrian', -- antrian, proses, selesai, diambil
  status_pembayaran TEXT DEFAULT 'belum_bayar', -- belum_bayar, dp, lunas
  
  -- Pricing
  subtotal DECIMAL(12,2) DEFAULT 0,
  diskon DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) DEFAULT 0,
  dp_amount DECIMAL(12,2) DEFAULT 0,
  sisa_bayar DECIMAL(12,2) DEFAULT 0,
  
  -- Dates
  estimasi_selesai TIMESTAMPTZ,
  tanggal_selesai TIMESTAMPTZ,
  tanggal_diambil TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items (detail per layanan)
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  layanan_id TEXT REFERENCES layanan(id),
  nama_layanan TEXT,
  qty DECIMAL(10,2) DEFAULT 1,
  harga DECIMAL(12,2),
  subtotal DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pengeluaran table
CREATE TABLE pengeluaran (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  kategori TEXT,
  keterangan TEXT,
  jumlah DECIMAL(12,2) NOT NULL,
  tanggal DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Karyawan table
CREATE TABLE karyawan (
  id TEXT PRIMARY KEY,
  user_id UUID, -- karyawan's own Firebase UID
  parent_user_id UUID REFERENCES users(id), -- owner's UID
  nama_lengkap TEXT NOT NULL,
  no_hp TEXT,
  role TEXT DEFAULT 'kasir',
  outlet_id TEXT REFERENCES outlets(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_parent_user_id ON orders(parent_user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status_order);
CREATE INDEX idx_pelanggan_user_id ON pelanggan(user_id);
CREATE INDEX idx_pengeluaran_user_id ON pengeluaran(user_id);
CREATE INDEX idx_pengeluaran_tanggal ON pengeluaran(tanggal);
```

## Step 2: Setup Cloud Functions

### 2.1 Initialize Firebase Functions

```bash
cd your-firebase-project
firebase init functions
# Pilih TypeScript
```

### 2.2 Install Dependencies

```bash
cd functions
npm install @supabase/supabase-js
```

### 2.3 Setup Environment Variables

```bash
firebase functions:config:set supabase.url="https://fybpbsnvcgdryqmrwsuz.supabase.co"
firebase functions:config:set supabase.service_key="YOUR_SUPABASE_SERVICE_ROLE_KEY"
```

### 2.4 Create Sync Functions

```typescript
// functions/src/index.ts

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';

admin.initializeApp();

// Initialize Supabase client
const supabaseUrl = functions.config().supabase.url;
const supabaseKey = functions.config().supabase.service_key;
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// ORDERS SYNC
// ============================================

export const syncOrderToSupabase = functions.firestore
  .document('orders/{orderId}')
  .onWrite(async (change, context) => {
    const orderId = context.params.orderId;
    
    // Delete
    if (!change.after.exists) {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
      
      if (error) console.error('Error deleting order:', error);
      return;
    }
    
    // Create or Update
    const data = change.after.data()!;
    
    const orderData = {
      id: orderId,
      nomor_order: data.nomorOrder || '',
      user_id: data.userId || null,
      parent_user_id: data.parentUserId || null,
      kasir_id: data.kasirId || null,
      outlet_id: data.outletId || null,
      pelanggan_id: data.pelangganId || null,
      nama_pelanggan: data.namaPelanggan || '',
      status_order: data.statusOrder || 'antrian',
      status_pembayaran: data.statusPembayaran || 'belum_bayar',
      subtotal: data.subtotal || 0,
      diskon: data.diskon || 0,
      total: data.total || 0,
      dp_amount: data.dpAmount || 0,
      sisa_bayar: data.sisaBayar || 0,
      estimasi_selesai: data.estimasiSelesai?.toDate() || null,
      tanggal_selesai: data.tanggalSelesai?.toDate() || null,
      tanggal_diambil: data.tanggalDiambil?.toDate() || null,
      created_at: data.createdAt?.toDate() || new Date(),
      updated_at: data.updatedAt?.toDate() || new Date(),
    };
    
    const { error } = await supabase
      .from('orders')
      .upsert(orderData, { onConflict: 'id' });
    
    if (error) {
      console.error('Error syncing order:', error);
    }
    
    // Sync order items if exists
    if (data.items && Array.isArray(data.items)) {
      // Delete existing items first
      await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId);
      
      // Insert new items
      const items = data.items.map((item: any, index: number) => ({
        id: `${orderId}_item_${index}`,
        order_id: orderId,
        layanan_id: item.layananId || null,
        nama_layanan: item.namaLayanan || '',
        qty: item.qty || 1,
        harga: item.harga || 0,
        subtotal: item.subtotal || 0,
        created_at: new Date(),
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(items);
      
      if (itemsError) {
        console.error('Error syncing order items:', itemsError);
      }
    }
  });

// ============================================
// PELANGGAN SYNC
// ============================================

export const syncPelangganToSupabase = functions.firestore
  .document('pelanggan/{pelangganId}')
  .onWrite(async (change, context) => {
    const pelangganId = context.params.pelangganId;
    
    if (!change.after.exists) {
      await supabase.from('pelanggan').delete().eq('id', pelangganId);
      return;
    }
    
    const data = change.after.data()!;
    
    const { error } = await supabase
      .from('pelanggan')
      .upsert({
        id: pelangganId,
        user_id: data.userId || null,
        parent_user_id: data.parentUserId || null,
        nama: data.nama || '',
        no_hp: data.noHp || '',
        alamat: data.alamat || '',
        total_transaksi: data.totalTransaksi || 0,
        created_at: data.createdAt?.toDate() || new Date(),
        updated_at: new Date(),
      }, { onConflict: 'id' });
    
    if (error) console.error('Error syncing pelanggan:', error);
  });

// ============================================
// PENGELUARAN SYNC
// ============================================

export const syncPengeluaranToSupabase = functions.firestore
  .document('pengeluaran/{pengeluaranId}')
  .onWrite(async (change, context) => {
    const pengeluaranId = context.params.pengeluaranId;
    
    if (!change.after.exists) {
      await supabase.from('pengeluaran').delete().eq('id', pengeluaranId);
      return;
    }
    
    const data = change.after.data()!;
    
    const { error } = await supabase
      .from('pengeluaran')
      .upsert({
        id: pengeluaranId,
        user_id: data.userId || null,
        kategori: data.kategori || '',
        keterangan: data.keterangan || '',
        jumlah: data.jumlah || 0,
        tanggal: data.tanggal?.toDate() || new Date(),
        created_at: data.createdAt?.toDate() || new Date(),
      }, { onConflict: 'id' });
    
    if (error) console.error('Error syncing pengeluaran:', error);
  });

// ============================================
// OUTLETS SYNC
// ============================================

export const syncOutletToSupabase = functions.firestore
  .document('outlets/{outletId}')
  .onWrite(async (change, context) => {
    const outletId = context.params.outletId;
    
    if (!change.after.exists) {
      await supabase.from('outlets').delete().eq('id', outletId);
      return;
    }
    
    const data = change.after.data()!;
    
    const { error } = await supabase
      .from('outlets')
      .upsert({
        id: outletId,
        user_id: data.userId || null,
        nama_outlet: data.nama_outlet || data.namaOutlet || '',
        alamat: data.alamat || '',
        no_hp: data.noHp || '',
        created_at: data.createdAt?.toDate() || new Date(),
        updated_at: new Date(),
      }, { onConflict: 'id' });
    
    if (error) console.error('Error syncing outlet:', error);
  });

// ============================================
// KARYAWAN SYNC
// ============================================

export const syncKaryawanToSupabase = functions.firestore
  .document('karyawan/{karyawanId}')
  .onWrite(async (change, context) => {
    const karyawanId = context.params.karyawanId;
    
    if (!change.after.exists) {
      await supabase.from('karyawan').delete().eq('id', karyawanId);
      return;
    }
    
    const data = change.after.data()!;
    
    const { error } = await supabase
      .from('karyawan')
      .upsert({
        id: karyawanId,
        user_id: data.userId || null,
        parent_user_id: data.parentUserId || null,
        nama_lengkap: data.namaLengkap || '',
        no_hp: data.noHp || '',
        role: data.role || 'kasir',
        outlet_id: data.outletId || null,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate() || new Date(),
      }, { onConflict: 'id' });
    
    if (error) console.error('Error syncing karyawan:', error);
  });

// ============================================
// LAYANAN SYNC
// ============================================

export const syncLayananToSupabase = functions.firestore
  .document('layanan/{layananId}')
  .onWrite(async (change, context) => {
    const layananId = context.params.layananId;
    
    if (!change.after.exists) {
      await supabase.from('layanan').delete().eq('id', layananId);
      return;
    }
    
    const data = change.after.data()!;
    
    const { error } = await supabase
      .from('layanan')
      .upsert({
        id: layananId,
        user_id: data.userId || null,
        outlet_id: data.outletId || null,
        nama_layanan: data.namaLayanan || '',
        nama_varian: data.namaVarian || '',
        harga: data.harga || 0,
        satuan: data.satuan || 'kg',
        estimasi_hari: data.estimasiHari || 1,
        created_at: data.createdAt?.toDate() || new Date(),
      }, { onConflict: 'id' });
    
    if (error) console.error('Error syncing layanan:', error);
  });
```

### 2.5 Deploy Functions

```bash
firebase deploy --only functions
```

## Step 3: Initial Data Migration

Untuk sync data yang sudah ada, buat script one-time migration:

```typescript
// functions/src/migration.ts
// Jalankan sekali untuk migrate existing data

import * as admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const supabase = createClient(
  'https://fybpbsnvcgdryqmrwsuz.supabase.co',
  'YOUR_SERVICE_ROLE_KEY'
);

const db = admin.firestore();

async function migrateCollection(
  collectionName: string, 
  tableName: string,
  transformFn: (id: string, data: any) => any
) {
  console.log(`Migrating ${collectionName}...`);
  
  const snapshot = await db.collection(collectionName).get();
  const records: any[] = [];
  
  snapshot.forEach(doc => {
    records.push(transformFn(doc.id, doc.data()));
  });
  
  if (records.length === 0) {
    console.log(`No records in ${collectionName}`);
    return;
  }
  
  // Batch insert (max 1000 per batch)
  const batchSize = 500;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const { error } = await supabase.from(tableName).upsert(batch, { onConflict: 'id' });
    
    if (error) {
      console.error(`Error migrating ${collectionName}:`, error);
    } else {
      console.log(`Migrated ${Math.min(i + batchSize, records.length)}/${records.length} ${collectionName}`);
    }
  }
}

async function runMigration() {
  // Migrate outlets first (no dependencies)
  await migrateCollection('outlets', 'outlets', (id, data) => ({
    id,
    user_id: data.userId || null,
    nama_outlet: data.nama_outlet || data.namaOutlet || '',
    alamat: data.alamat || '',
    no_hp: data.noHp || '',
    created_at: data.createdAt?.toDate() || new Date(),
    updated_at: new Date(),
  }));
  
  // Migrate pelanggan
  await migrateCollection('pelanggan', 'pelanggan', (id, data) => ({
    id,
    user_id: data.userId || null,
    parent_user_id: data.parentUserId || null,
    nama: data.nama || '',
    no_hp: data.noHp || '',
    alamat: data.alamat || '',
    total_transaksi: data.totalTransaksi || 0,
    created_at: data.createdAt?.toDate() || new Date(),
    updated_at: new Date(),
  }));
  
  // Migrate layanan
  await migrateCollection('layanan', 'layanan', (id, data) => ({
    id,
    user_id: data.userId || null,
    outlet_id: data.outletId || null,
    nama_layanan: data.namaLayanan || '',
    nama_varian: data.namaVarian || '',
    harga: data.harga || 0,
    satuan: data.satuan || 'kg',
    estimasi_hari: data.estimasiHari || 1,
    created_at: data.createdAt?.toDate() || new Date(),
  }));
  
  // Migrate orders
  await migrateCollection('orders', 'orders', (id, data) => ({
    id,
    nomor_order: data.nomorOrder || '',
    user_id: data.userId || null,
    parent_user_id: data.parentUserId || null,
    kasir_id: data.kasirId || null,
    outlet_id: data.outletId || null,
    pelanggan_id: data.pelangganId || null,
    nama_pelanggan: data.namaPelanggan || '',
    status_order: data.statusOrder || 'antrian',
    status_pembayaran: data.statusPembayaran || 'belum_bayar',
    subtotal: data.subtotal || 0,
    diskon: data.diskon || 0,
    total: data.total || 0,
    dp_amount: data.dpAmount || 0,
    sisa_bayar: data.sisaBayar || 0,
    estimasi_selesai: data.estimasiSelesai?.toDate() || null,
    tanggal_selesai: data.tanggalSelesai?.toDate() || null,
    tanggal_diambil: data.tanggalDiambil?.toDate() || null,
    created_at: data.createdAt?.toDate() || new Date(),
    updated_at: data.updatedAt?.toDate() || new Date(),
  }));
  
  // Migrate pengeluaran
  await migrateCollection('pengeluaran', 'pengeluaran', (id, data) => ({
    id,
    user_id: data.userId || null,
    kategori: data.kategori || '',
    keterangan: data.keterangan || '',
    jumlah: data.jumlah || 0,
    tanggal: data.tanggal?.toDate() || new Date(),
    created_at: data.createdAt?.toDate() || new Date(),
  }));
  
  // Migrate karyawan
  await migrateCollection('karyawan', 'karyawan', (id, data) => ({
    id,
    user_id: data.userId || null,
    parent_user_id: data.parentUserId || null,
    nama_lengkap: data.namaLengkap || '',
    no_hp: data.noHp || '',
    role: data.role || 'kasir',
    outlet_id: data.outletId || null,
    is_active: data.isActive !== false,
    created_at: data.createdAt?.toDate() || new Date(),
  }));
  
  console.log('Migration complete!');
}

runMigration().catch(console.error);
```

## Step 4: Query Reporting di Supabase

Sekarang kamu bisa query kompleks di Supabase!

### Contoh Query Reporting:

```sql
-- Total omset per bulan
SELECT 
  DATE_TRUNC('month', created_at) as bulan,
  COUNT(*) as total_order,
  SUM(total) as total_omset
FROM orders
WHERE user_id = 'xxx' 
  AND status_pembayaran = 'lunas'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY bulan DESC;

-- Omset 7 hari terakhir
SELECT 
  DATE(created_at) as tanggal,
  COUNT(*) as jumlah_order,
  SUM(total) as omset
FROM orders
WHERE user_id = 'xxx'
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY tanggal;

-- Top 10 pelanggan
SELECT 
  p.nama,
  p.no_hp,
  COUNT(o.id) as total_order,
  SUM(o.total) as total_belanja
FROM pelanggan p
LEFT JOIN orders o ON o.pelanggan_id = p.id
WHERE p.user_id = 'xxx'
GROUP BY p.id, p.nama, p.no_hp
ORDER BY total_belanja DESC
LIMIT 10;

-- Layanan paling laris
SELECT 
  oi.nama_layanan,
  COUNT(*) as jumlah_order,
  SUM(oi.qty) as total_qty,
  SUM(oi.subtotal) as total_pendapatan
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.user_id = 'xxx'
  AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY oi.nama_layanan
ORDER BY total_pendapatan DESC;

-- Profit (omset - pengeluaran) per bulan
WITH monthly_income AS (
  SELECT 
    DATE_TRUNC('month', created_at) as bulan,
    SUM(total) as omset
  FROM orders
  WHERE user_id = 'xxx' AND status_pembayaran = 'lunas'
  GROUP BY DATE_TRUNC('month', created_at)
),
monthly_expense AS (
  SELECT 
    DATE_TRUNC('month', tanggal) as bulan,
    SUM(jumlah) as pengeluaran
  FROM pengeluaran
  WHERE user_id = 'xxx'
  GROUP BY DATE_TRUNC('month', tanggal)
)
SELECT 
  COALESCE(i.bulan, e.bulan) as bulan,
  COALESCE(i.omset, 0) as omset,
  COALESCE(e.pengeluaran, 0) as pengeluaran,
  COALESCE(i.omset, 0) - COALESCE(e.pengeluaran, 0) as profit
FROM monthly_income i
FULL OUTER JOIN monthly_expense e ON i.bulan = e.bulan
ORDER BY bulan DESC;

-- Order by status
SELECT 
  status_order,
  COUNT(*) as jumlah
FROM orders
WHERE user_id = 'xxx'
GROUP BY status_order;
```

## Step 5: Buat API Reporting (Optional)

Kalau mau akses dari Flutter app, buat Supabase Edge Function atau pakai langsung Supabase client:

```dart
// Di Flutter app
final supabase = Supabase.instance.client;

// Query omset 7 hari terakhir
final response = await supabase
  .from('orders')
  .select('created_at, total')
  .eq('user_id', userId)
  .gte('created_at', DateTime.now().subtract(Duration(days: 7)).toIso8601String())
  .eq('status_pembayaran', 'lunas');

// Atau pakai RPC untuk query kompleks
final result = await supabase.rpc('get_monthly_report', params: {
  'p_user_id': userId,
  'p_year': 2024,
});
```

## Checklist

- [ ] Setup Supabase schema (Step 1)
- [ ] Setup Cloud Functions project
- [ ] Install dependencies
- [ ] Set environment variables
- [ ] Deploy sync functions
- [ ] Run initial migration
- [ ] Test sync dengan create/update/delete di Firestore
- [ ] Verify data di Supabase
- [ ] Test reporting queries

## Notes

1. **Biaya**: Cloud Functions trigger setiap write ke Firestore. Estimasi cost tergantung volume transaksi.

2. **Latency**: Ada delay ~1-3 detik antara write di Firestore dan sync ke Supabase. Untuk reporting ini acceptable.

3. **Error handling**: Tambahkan retry logic dan dead letter queue untuk production.

4. **Monitoring**: Setup alerts di Firebase Console untuk monitor function errors.
