import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan aplikasi SIKASIR LAUNDRY. Baca sebelum menggunakan layanan kami.",
};

export default function TermsPage() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Syarat & Ketentuan
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Terakhir diperbarui: Februari 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Penerimaan Syarat</h2>
              <p className="text-gray-600 leading-relaxed">
                Dengan mengunduh, menginstal, atau menggunakan aplikasi SIKASIR LAUNDRY, Anda menyetujui 
                untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat ini, 
                mohon untuk tidak menggunakan aplikasi kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Deskripsi Layanan</h2>
              <p className="text-gray-600 leading-relaxed">
                SIKASIR LAUNDRY adalah aplikasi kasir digital yang dirancang untuk membantu pelaku usaha 
                laundry dalam mengelola transaksi, pelanggan, karyawan, dan laporan keuangan. Layanan 
                kami tersedia dalam versi gratis dan berbayar dengan fitur yang berbeda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Akun Pengguna</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Anda bertanggung jawab menjaga kerahasiaan akun dan password Anda</li>
                <li>Anda harus memberikan informasi yang akurat dan lengkap saat mendaftar</li>
                <li>Anda bertanggung jawab atas semua aktivitas yang terjadi di akun Anda</li>
                <li>Segera laporkan jika ada penggunaan tidak sah pada akun Anda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Penggunaan yang Diizinkan</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Anda setuju untuk menggunakan aplikasi hanya untuk tujuan yang sah dan sesuai dengan 
                syarat ini. Anda tidak diperkenankan untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menggunakan aplikasi untuk aktivitas ilegal atau melanggar hukum</li>
                <li>Mencoba mengakses sistem atau data tanpa izin</li>
                <li>Menyebarkan virus atau kode berbahaya</li>
                <li>Melakukan reverse engineering pada aplikasi</li>
                <li>Menjual kembali atau mendistribusikan ulang aplikasi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Pembayaran dan Langganan</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Paket gratis tersedia tanpa batas waktu dengan fitur terbatas</li>
                <li>Paket berbayar dikenakan biaya sesuai dengan paket yang dipilih</li>
                <li>Pembayaran dilakukan di muka untuk periode langganan</li>
                <li>Harga dapat berubah dengan pemberitahuan sebelumnya</li>
                <li>Tidak ada pengembalian dana untuk langganan yang sudah berjalan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data dan Privasi</h2>
              <p className="text-gray-600 leading-relaxed">
                Penggunaan data pribadi Anda diatur dalam Kebijakan Privasi kami. Dengan menggunakan 
                aplikasi, Anda menyetujui pengumpulan dan penggunaan data sesuai dengan Kebijakan 
                Privasi tersebut.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Hak Kekayaan Intelektual</h2>
              <p className="text-gray-600 leading-relaxed">
                Semua hak kekayaan intelektual dalam aplikasi SIKASIR LAUNDRY, termasuk namun tidak 
                terbatas pada desain, logo, kode, dan konten, adalah milik kami atau pemberi lisensi 
                kami. Anda tidak mendapatkan hak kepemilikan atas aplikasi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Batasan Tanggung Jawab</h2>
              <p className="text-gray-600 leading-relaxed">
                SIKASIR LAUNDRY disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apapun. Kami tidak 
                bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial 
                yang timbul dari penggunaan aplikasi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Penghentian Layanan</h2>
              <p className="text-gray-600 leading-relaxed">
                Kami berhak menghentikan atau menangguhkan akses Anda ke aplikasi kapan saja, dengan 
                atau tanpa pemberitahuan, jika Anda melanggar syarat dan ketentuan ini atau karena 
                alasan lain yang kami anggap perlu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Perubahan Syarat</h2>
              <p className="text-gray-600 leading-relaxed">
                Kami dapat mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku 
                segera setelah dipublikasikan di aplikasi atau website. Penggunaan berkelanjutan 
                setelah perubahan berarti Anda menyetujui syarat yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Hukum yang Berlaku</h2>
              <p className="text-gray-600 leading-relaxed">
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik 
                Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di 
                Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Hubungi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
              </p>
              <ul className="list-none text-gray-600 mt-3 space-y-1">
                <li>Email: support@sikasirlaundry.web.id</li>
                <li>WhatsApp: +62 851-4490-7717</li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
