-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Tips Bisnis',
  read_time TEXT DEFAULT '5 menit',
  cover_emoji TEXT DEFAULT '📝',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, created_at DESC);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON public.blog_posts
  FOR SELECT
  USING (is_published = true);

-- Allow all operations for authenticated users (admin)
CREATE POLICY "Admin full access"
  ON public.blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed existing articles
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, read_time, is_published, created_at) VALUES
('cara-memulai-usaha-laundry', 'Cara Memulai Usaha Laundry dari Nol untuk Pemula', 'Panduan lengkap memulai bisnis laundry dengan modal kecil.', '## Mengapa Usaha Laundry Menjanjikan?

Usaha laundry merupakan salah satu bisnis yang terus berkembang di Indonesia.

## 1. Riset Pasar dan Lokasi

- Identifikasi kompetitor yang sudah ada
- Pelajari harga pasar di sekitar lokasi
- Tentukan target pelanggan
- Pilih lokasi strategis

## 2. Siapkan Modal Awal

Laundry Kiloan Skala Kecil (Rp 10-20 juta): Mesin cuci 1-2 unit, setrika, timbangan digital.

Laundry Menengah (Rp 30-50 juta): Mesin cuci 3-5 unit, mesin pengering, setrika uap, sistem kasir digital.

## 3. Gunakan Aplikasi Kasir Digital

- Pencatatan transaksi otomatis
- Manajemen pelanggan
- Tracking status laundry
- Laporan keuangan real-time', 'Tips Bisnis', '5 menit', true, '2026-02-01'),

('keuntungan-aplikasi-kasir-laundry', '5 Keuntungan Menggunakan Aplikasi Kasir untuk Usaha Laundry', 'Mengapa usaha laundry modern perlu aplikasi kasir digital?', '## Era Digital untuk Usaha Laundry

Mengelola usaha laundry secara manual sudah tidak efisien lagi.

## 1. Pencatatan Transaksi Otomatis

- Tidak ada lagi nota yang hilang
- Riwayat transaksi tersimpan aman

## 2. Laporan Keuangan Real-Time

- Laporan harian, mingguan, bulanan
- Analisis profit dan pengeluaran

## 3. Manajemen Pelanggan

- Database pelanggan lengkap
- Sistem member dan poin reward

## 4. Tracking Status Laundry

- Notifikasi otomatis saat selesai
- Meningkatkan kepuasan pelanggan

## 5. Efisiensi Operasional

- Proses transaksi lebih cepat
- Kelola banyak cabang dalam satu dashboard', 'Teknologi', '4 menit', true, '2026-01-28'),

('tutorial-sikasir-laundry-pemula', 'Tutorial Lengkap Menggunakan SIKASIR LAUNDRY untuk Pemula', 'Panduan step-by-step dari registrasi hingga cetak laporan.', '## Mulai Pakai SIKASIR LAUNDRY

## 1. Download dan Registrasi

- Buka Google Play Store
- Cari SIKASIR LAUNDRY
- Install dan daftar

## 2. Setup Outlet

- Masukkan nama outlet
- Tambahkan alamat lengkap
- Set jam operasional

## 3. Tambah Layanan dan Harga

- Laundry kiloan
- Laundry satuan
- Dry cleaning
- Express/kilat

## 4. Input Transaksi Pertama

- Pilih pelanggan
- Pilih layanan dan masukkan berat
- Set estimasi selesai
- Kirim struk via WhatsApp

## 5. Pantau Dashboard

- Ringkasan transaksi hari ini
- Status order yang sedang berjalan
- Monitor pendapatan harian', 'Tutorial', '7 menit', true, '2026-02-05');
