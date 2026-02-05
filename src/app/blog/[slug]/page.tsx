import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}> = {
  "cara-memulai-usaha-laundry": {
    title: "Cara Memulai Usaha Laundry dari Nol untuk Pemula",
    description: "Panduan lengkap memulai bisnis laundry dengan modal kecil. Pelajari langkah-langkah, peralatan yang dibutuhkan, dan tips sukses.",
    date: "1 Februari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit",
    content: `
## Mengapa Usaha Laundry Menjanjikan?

Usaha laundry merupakan salah satu bisnis yang terus berkembang di Indonesia. Dengan gaya hidup masyarakat yang semakin sibuk, kebutuhan akan jasa laundry terus meningkat. Berikut panduan lengkap untuk memulai usaha laundry dari nol.

## 1. Riset Pasar dan Lokasi

Sebelum memulai, lakukan riset pasar di area target Anda:
- Identifikasi kompetitor yang sudah ada
- Pelajari harga pasar di sekitar lokasi
- Tentukan target pelanggan (mahasiswa, pekerja, keluarga)
- Pilih lokasi strategis dekat pemukiman atau kos-kosan

## 2. Siapkan Modal Awal

Modal untuk memulai usaha laundry bervariasi tergantung skala:

**Laundry Kiloan Skala Kecil (Rp 10-20 juta):**
- Mesin cuci 1-2 unit
- Setrika dan meja setrika
- Timbangan digital
- Rak dan perlengkapan

**Laundry Menengah (Rp 30-50 juta):**
- Mesin cuci 3-5 unit
- Mesin pengering
- Setrika uap
- Sistem kasir digital

## 3. Peralatan yang Dibutuhkan

Daftar peralatan wajib untuk usaha laundry:
- Mesin cuci (front loading lebih hemat air)
- Mesin pengering (opsional tapi sangat membantu)
- Setrika dan meja setrika
- Timbangan digital
- Rak penyimpanan
- Plastik kemasan dan hanger
- Deterjen dan pewangi berkualitas

## 4. Tentukan Layanan dan Harga

Jenis layanan yang bisa ditawarkan:
- Laundry kiloan (cuci + setrika)
- Laundry satuan (per item)
- Dry cleaning
- Express/kilat (1 hari selesai)
- Antar jemput

Tips menentukan harga:
- Survey harga kompetitor
- Hitung biaya operasional per kg
- Tambahkan margin keuntungan 30-50%
- Berikan harga khusus untuk pelanggan tetap

## 5. Gunakan Aplikasi Kasir Digital

Manfaatkan teknologi untuk mengelola usaha:
- Pencatatan transaksi otomatis
- Manajemen pelanggan
- Tracking status laundry
- Laporan keuangan real-time

Aplikasi seperti SIKASIR LAUNDRY bisa membantu Anda mengelola semua ini dalam satu platform yang mudah digunakan.

## 6. Strategi Marketing

Promosikan usaha laundry Anda:
- Buat akun media sosial
- Tawarkan promo pembukaan
- Berikan kartu member untuk pelanggan setia
- Minta review dari pelanggan puas
- Pasang banner di lokasi strategis

## Tips Sukses Usaha Laundry

1. **Jaga kualitas** - Pastikan hasil cucian bersih dan wangi
2. **Tepat waktu** - Selesaikan sesuai estimasi yang dijanjikan
3. **Layanan ramah** - Bangun hubungan baik dengan pelanggan
4. **Catat semua transaksi** - Gunakan sistem kasir untuk tracking
5. **Terus berinovasi** - Tambah layanan sesuai kebutuhan pelanggan

## Kesimpulan

Memulai usaha laundry tidak harus dengan modal besar. Yang terpenting adalah konsistensi dalam menjaga kualitas dan pelayanan. Dengan bantuan teknologi seperti aplikasi kasir digital, Anda bisa mengelola usaha dengan lebih efisien dan profesional.

Siap memulai usaha laundry Anda? Download SIKASIR LAUNDRY sekarang dan kelola bisnis dengan lebih mudah!
    `
  },
  "keuntungan-aplikasi-kasir-laundry": {
    title: "5 Keuntungan Menggunakan Aplikasi Kasir untuk Usaha Laundry",
    description: "Mengapa usaha laundry modern perlu aplikasi kasir digital? Simak keuntungannya untuk efisiensi dan pertumbuhan bisnis.",
    date: "28 Januari 2026",
    category: "Teknologi",
    readTime: "4 menit",
    content: `
## Era Digital untuk Usaha Laundry

Di era digital ini, mengelola usaha laundry secara manual sudah tidak efisien lagi. Aplikasi kasir digital hadir sebagai solusi untuk membantu pelaku usaha laundry mengelola bisnis dengan lebih profesional.

## 1. Pencatatan Transaksi Otomatis

Dengan aplikasi kasir, setiap transaksi tercatat secara otomatis dan akurat:
- Tidak ada lagi nota yang hilang atau rusak
- Riwayat transaksi tersimpan dengan aman
- Mudah mencari data transaksi lama
- Mengurangi kesalahan pencatatan manual

## 2. Laporan Keuangan Real-Time

Salah satu keuntungan terbesar adalah laporan keuangan otomatis:
- Laporan harian, mingguan, dan bulanan
- Grafik pendapatan yang mudah dipahami
- Analisis profit dan pengeluaran
- Export laporan untuk keperluan pajak

## 3. Manajemen Pelanggan Lebih Baik

Aplikasi kasir membantu Anda mengenal pelanggan:
- Database pelanggan lengkap
- Riwayat transaksi per pelanggan
- Sistem member dan poin reward
- Kirim promo via WhatsApp

## 4. Tracking Status Laundry

Fitur yang sangat dibutuhkan pelanggan:
- Pelanggan bisa cek status laundry online
- Notifikasi otomatis saat laundry selesai
- Mengurangi pertanyaan berulang dari pelanggan
- Meningkatkan kepuasan pelanggan

## 5. Efisiensi Operasional

Hemat waktu dan tenaga dengan:
- Proses transaksi lebih cepat
- Tidak perlu hitung manual
- Cetak struk otomatis
- Kelola banyak cabang dalam satu dashboard

## Mengapa Pilih SIKASIR LAUNDRY?

SIKASIR LAUNDRY dirancang khusus untuk kebutuhan usaha laundry Indonesia:
- Interface bahasa Indonesia yang mudah dipahami
- Fitur lengkap untuk laundry kiloan dan satuan
- Gratis untuk paket dasar
- Support tim lokal yang responsif

## Kesimpulan

Investasi pada aplikasi kasir digital adalah langkah cerdas untuk mengembangkan usaha laundry Anda. Dengan berbagai keuntungan yang ditawarkan, Anda bisa fokus pada peningkatan kualitas layanan sambil sistem mengelola administrasi secara otomatis.
    `
  },
  "tips-meningkatkan-pelanggan-laundry": {
    title: "7 Tips Ampuh Meningkatkan Jumlah Pelanggan Laundry",
    description: "Strategi marketing efektif untuk menarik lebih banyak pelanggan ke usaha laundry Anda. Dari promosi hingga layanan prima.",
    date: "25 Januari 2026",
    category: "Marketing",
    readTime: "6 menit",
    content: `
## Tantangan Mendapatkan Pelanggan Laundry

Persaingan usaha laundry semakin ketat. Untuk bertahan dan berkembang, Anda perlu strategi yang tepat untuk menarik dan mempertahankan pelanggan.

## 1. Berikan Kualitas Terbaik

Fondasi utama bisnis laundry adalah kualitas:
- Gunakan deterjen dan pewangi berkualitas
- Pastikan pakaian bersih dan wangi
- Setrika dengan rapi
- Kemasan yang menarik

## 2. Layanan Antar Jemput

Kemudahan adalah nilai jual:
- Tawarkan layanan antar jemput gratis
- Tentukan radius layanan yang masuk akal
- Gunakan aplikasi untuk tracking
- Jadwalkan pengambilan secara teratur

## 3. Program Member dan Loyalty

Hargai pelanggan setia Anda:
- Buat kartu member dengan benefit khusus
- Sistem poin yang bisa ditukar
- Diskon untuk pelanggan tetap
- Promo ulang tahun pelanggan

## 4. Manfaatkan Media Sosial

Promosi digital yang efektif:
- Buat akun Instagram dan Facebook
- Posting foto hasil laundry yang rapi
- Share testimoni pelanggan
- Adakan giveaway atau promo khusus

## 5. Promo yang Menarik

Strategi promo yang terbukti berhasil:
- Diskon untuk pelanggan baru
- Promo paket hemat (misal: 5kg gratis 1kg)
- Happy hour di jam sepi
- Referral program (ajak teman dapat diskon)

## 6. Layanan Express/Kilat

Tawarkan opsi untuk yang butuh cepat:
- Layanan 1 hari selesai
- Layanan same day (pagi antar, sore jadi)
- Harga premium untuk layanan express
- Prioritaskan kualitas tetap terjaga

## 7. Tracking Online untuk Pelanggan

Berikan kemudahan cek status:
- Link tracking yang bisa diakses pelanggan
- Notifikasi WhatsApp saat laundry selesai
- Transparansi proses laundry
- Meningkatkan kepercayaan pelanggan

## Gunakan Teknologi untuk Mendukung

Aplikasi kasir seperti SIKASIR LAUNDRY membantu Anda:
- Kelola data pelanggan dengan baik
- Kirim promo via WhatsApp
- Tracking status untuk pelanggan
- Analisis pelanggan terbaik Anda

## Kesimpulan

Meningkatkan pelanggan laundry butuh kombinasi kualitas layanan dan strategi marketing yang tepat. Dengan konsistensi dan bantuan teknologi, usaha laundry Anda bisa terus berkembang.
    `
  },
  "cara-menghitung-harga-laundry": {
    title: "Cara Menghitung Harga Laundry yang Tepat dan Kompetitif",
    description: "Panduan menentukan harga jasa laundry kiloan dan satuan. Perhitungkan biaya operasional dan margin keuntungan.",
    date: "20 Januari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit",
    content: `
## Pentingnya Menentukan Harga yang Tepat

Harga yang terlalu murah bisa merugikan, terlalu mahal bisa kehilangan pelanggan. Berikut cara menghitung harga laundry yang tepat.

## Komponen Biaya Operasional

Hitung semua biaya yang dikeluarkan:

**Biaya Tetap (per bulan):**
- Sewa tempat
- Gaji karyawan
- Cicilan mesin (jika ada)
- Listrik dan air

**Biaya Variabel (per kg):**
- Deterjen: Rp 500-1.000/kg
- Pewangi: Rp 200-500/kg
- Plastik kemasan: Rp 100-200/kg
- Listrik mesin: Rp 300-500/kg

## Rumus Menghitung Harga

**Harga per kg = (Biaya Variabel + Biaya Tetap/Kapasitas) + Margin**

Contoh perhitungan:
- Biaya variabel: Rp 1.500/kg
- Biaya tetap: Rp 5.000.000/bulan
- Kapasitas: 1.000 kg/bulan
- Biaya tetap per kg: Rp 5.000
- Total biaya: Rp 6.500/kg
- Margin 40%: Rp 2.600
- **Harga jual: Rp 9.100/kg** (bulatkan Rp 9.000-10.000)

## Harga Pasar Laundry 2026

Referensi harga di berbagai kota:

**Jakarta & Kota Besar:**
- Kiloan reguler: Rp 7.000-10.000/kg
- Kiloan express: Rp 12.000-15.000/kg
- Satuan kemeja: Rp 8.000-12.000
- Bed cover: Rp 25.000-40.000

**Kota Menengah:**
- Kiloan reguler: Rp 5.000-7.000/kg
- Kiloan express: Rp 8.000-12.000/kg

## Tips Menentukan Harga

1. **Survey kompetitor** - Ketahui harga pasar di sekitar Anda
2. **Sesuaikan dengan target market** - Mahasiswa vs keluarga
3. **Buat variasi harga** - Reguler, express, premium
4. **Review berkala** - Sesuaikan dengan kenaikan biaya
5. **Jangan perang harga** - Fokus pada kualitas

## Strategi Harga untuk Pemula

Jika baru memulai:
- Harga sedikit di bawah kompetitor untuk menarik pelanggan
- Berikan promo pembukaan
- Naikkan harga bertahap setelah punya pelanggan tetap
- Fokus bangun reputasi dulu

## Kesimpulan

Menentukan harga laundry perlu perhitungan matang. Pastikan harga menutupi biaya operasional dan memberikan keuntungan yang layak. Gunakan aplikasi kasir untuk tracking biaya dan pendapatan secara akurat.
    `
  },
  "mengelola-karyawan-laundry": {
    title: "Tips Mengelola Karyawan Laundry agar Produktif",
    description: "Cara efektif mengatur jadwal, pembagian tugas, dan memotivasi karyawan laundry untuk hasil kerja maksimal.",
    date: "15 Januari 2026",
    category: "Manajemen",
    readTime: "4 menit",
    content: `
## Pentingnya Manajemen Karyawan

Karyawan adalah aset penting dalam usaha laundry. Pengelolaan yang baik akan meningkatkan produktivitas dan kualitas layanan.

## 1. Pembagian Tugas yang Jelas

Tentukan job description untuk setiap posisi:

**Bagian Penerimaan:**
- Menerima dan menimbang laundry
- Input data ke sistem kasir
- Komunikasi dengan pelanggan

**Bagian Pencucian:**
- Sortir pakaian berdasarkan warna/bahan
- Operasikan mesin cuci dan pengering
- Pastikan kebersihan hasil cucian

**Bagian Setrika & Packing:**
- Setrika dengan rapi
- Lipat dan kemas pakaian
- Siapkan untuk pengambilan

## 2. Jadwal Kerja yang Efisien

Tips mengatur jadwal:
- Buat shift yang adil
- Sesuaikan dengan jam ramai
- Berikan libur yang cukup
- Siapkan backup untuk hari libur

## 3. Training dan SOP

Standarisasi kualitas kerja:
- Buat SOP tertulis untuk setiap proses
- Training karyawan baru dengan baik
- Evaluasi berkala
- Update SOP jika ada perubahan

## 4. Sistem Monitoring

Pantau kinerja karyawan:
- Gunakan aplikasi kasir untuk tracking aktivitas
- Catat transaksi per karyawan
- Review hasil kerja secara berkala
- Berikan feedback konstruktif

## 5. Motivasi dan Reward

Jaga semangat kerja karyawan:
- Gaji yang kompetitif
- Bonus untuk kinerja bagus
- Apresiasi untuk pencapaian
- Lingkungan kerja yang nyaman

## Gunakan Teknologi untuk Membantu

Aplikasi SIKASIR LAUNDRY memudahkan manajemen karyawan:
- Setiap karyawan punya akun sendiri
- Tracking transaksi per karyawan
- Laporan produktivitas
- Akses terbatas sesuai peran

## Kesimpulan

Karyawan yang dikelola dengan baik akan memberikan hasil kerja maksimal. Kombinasikan manajemen yang baik dengan teknologi untuk efisiensi operasional.
    `
  },
  "peralatan-wajib-usaha-laundry": {
    title: "Daftar Peralatan Wajib untuk Memulai Usaha Laundry",
    description: "Rekomendasi mesin cuci, pengering, setrika, dan perlengkapan lainnya untuk usaha laundry pemula hingga profesional.",
    date: "10 Januari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit",
    content: `
## Investasi Peralatan yang Tepat

Memilih peralatan yang tepat adalah investasi penting untuk usaha laundry. Berikut panduan lengkap peralatan yang dibutuhkan.

## 1. Mesin Cuci

**Untuk Pemula (1-2 unit):**
- Kapasitas 8-10 kg
- Front loading lebih hemat air
- Merek: Samsung, LG, Electrolux
- Budget: Rp 4-7 juta/unit

**Untuk Skala Menengah:**
- Kapasitas 10-15 kg
- Mesin cuci komersial
- Fitur heavy duty
- Budget: Rp 8-15 juta/unit

## 2. Mesin Pengering

Sangat membantu terutama saat musim hujan:
- Kapasitas sesuai mesin cuci
- Hemat waktu pengeringan
- Budget: Rp 3-8 juta

## 3. Setrika

**Setrika Biasa:**
- Untuk pemula
- Budget: Rp 200-500 ribu

**Setrika Uap:**
- Hasil lebih rapi
- Lebih cepat
- Budget: Rp 500 ribu - 2 juta

**Setrika Uap Berdiri:**
- Untuk volume besar
- Profesional
- Budget: Rp 1-3 juta

## 4. Timbangan Digital

Wajib untuk laundry kiloan:
- Kapasitas minimal 30 kg
- Akurasi tinggi
- Budget: Rp 200-500 ribu

## 5. Perlengkapan Pendukung

**Rak dan Lemari:**
- Rak untuk pakaian kotor
- Lemari untuk pakaian bersih
- Gantungan baju

**Perlengkapan Cuci:**
- Deterjen berkualitas
- Pewangi pakaian
- Pemutih (untuk putih)
- Pelembut pakaian

**Kemasan:**
- Plastik laundry
- Hanger
- Label nama pelanggan

## 6. Sistem Kasir

Jangan lupakan sistem pencatatan:
- Smartphone/tablet untuk aplikasi kasir
- Printer thermal untuk struk
- Aplikasi kasir seperti SIKASIR LAUNDRY

## Estimasi Modal Awal

**Skala Kecil (Rp 15-25 juta):**
- 1-2 mesin cuci
- Setrika biasa
- Perlengkapan dasar

**Skala Menengah (Rp 40-60 juta):**
- 3-4 mesin cuci
- 1-2 pengering
- Setrika uap
- Sistem kasir lengkap

## Tips Membeli Peralatan

1. **Beli sesuai kebutuhan** - Jangan over invest di awal
2. **Pilih merek terpercaya** - Garansi dan spare part mudah
3. **Pertimbangkan second** - Mesin bekas berkualitas bisa jadi opsi
4. **Hitung biaya listrik** - Pilih yang hemat energi

## Kesimpulan

Investasi peralatan yang tepat akan mendukung operasional usaha laundry Anda. Mulai dari yang esensial, lalu upgrade seiring pertumbuhan bisnis.
    `
  }
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  
  return {
    title: article.title,
    description: article.description,
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  
  if (!article) {
    notFound();
  }

  return (
    <div className="py-20 md:py-28">
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">
              ← Kembali ke Blog
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">{article.readTime} baca</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          
          <p className="text-gray-500 mb-8">{article.date}</p>
          
          <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={index} className="font-semibold mt-4">{paragraph.replace(/\*\*/g, '')}</p>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="text-gray-600 ml-4">{paragraph.replace('- ', '')}</li>;
              }
              if (paragraph.trim()) {
                return <p key={index} className="text-gray-600 mb-4">{paragraph}</p>;
              }
              return null;
            })}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Kelola Usaha Laundry Lebih Mudah!</h3>
            <p className="text-gray-600 mb-4">
              Download SIKASIR LAUNDRY sekarang dan rasakan kemudahan mengelola bisnis laundry Anda.
            </p>
            <a 
              href="https://play.google.com/store/apps/details?id=com.sikasir.laundry.sikasirlaundry"
              target="_blank"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download Gratis
            </a>
          </div>
        </article>
      </Container>
    </div>
  );
}
