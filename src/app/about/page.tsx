import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali lebih dekat SIKASIR LAUNDRY - aplikasi kasir laundry digital yang membantu ribuan UMKM laundry di Indonesia.",
};

export default function AboutPage() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Tentang SIKASIR LAUNDRY
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Siapa Kami?</h2>
              <p className="text-gray-600 leading-relaxed">
                SIKASIR LAUNDRY adalah aplikasi kasir laundry digital yang dikembangkan oleh tim developer Indonesia 
                yang memahami kebutuhan pelaku usaha laundry. Kami hadir untuk membantu ribuan UMKM laundry 
                di seluruh Indonesia mengelola bisnis mereka dengan lebih mudah, cepat, dan profesional.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Visi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Menjadi aplikasi kasir laundry #1 di Indonesia yang membantu setiap pelaku usaha laundry 
                bertransformasi digital dan meningkatkan efisiensi operasional bisnis mereka.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menyediakan aplikasi kasir laundry yang mudah digunakan oleh siapa saja</li>
                <li>Membantu UMKM laundry mengelola transaksi, pelanggan, dan karyawan dalam satu platform</li>
                <li>Memberikan laporan keuangan otomatis yang akurat dan real-time</li>
                <li>Terus berinovasi menghadirkan fitur-fitur yang dibutuhkan pelaku usaha laundry</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Mengapa Memilih Kami?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">🚀 Mudah Digunakan</h3>
                  <p className="text-gray-600 text-sm">
                    Interface yang simpel dan intuitif, tidak perlu training khusus untuk mulai menggunakan.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">💰 Gratis Selamanya</h3>
                  <p className="text-gray-600 text-sm">
                    Paket dasar gratis tanpa batas waktu dengan fitur lengkap untuk memulai usaha.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">📊 Laporan Otomatis</h3>
                  <p className="text-gray-600 text-sm">
                    Dapatkan laporan keuangan harian, mingguan, dan bulanan secara otomatis.
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">🛡️ Aman & Terpercaya</h3>
                  <p className="text-gray-600 text-sm">
                    Data tersimpan aman di cloud dengan backup otomatis setiap hari.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Pencapaian Kami</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">1000+</p>
                  <p className="text-gray-600 text-sm">Pengguna Aktif</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">50K+</p>
                  <p className="text-gray-600 text-sm">Transaksi/Bulan</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">4.8★</p>
                  <p className="text-gray-600 text-sm">Rating Play Store</p>
                </div>
              </div>
            </section>

            <section className="text-center bg-blue-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Siap Bergabung?</h2>
              <p className="mb-6">
                Download SIKASIR LAUNDRY sekarang dan rasakan kemudahan mengelola bisnis laundry Anda!
              </p>
              <a 
                href="https://play.google.com/store/apps/details?id=com.sikasir.laundry.sikasirlaundry" 
                target="_blank"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Download Gratis
              </a>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
