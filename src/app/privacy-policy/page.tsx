import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi aplikasi SIKASIR LAUNDRY. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Berlaku sejak: 26 Juni 2025 &middot; Terakhir diperbarui: Maret 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-600 leading-relaxed">
              Terima kasih telah menggunakan SIKASIR LAUNDRY (&quot;Aplikasi&quot;), aplikasi Point of Sale (POS) 
              yang dirancang untuk membantu operasional bisnis laundry Anda. Kebijakan Privasi ini menjelaskan 
              bagaimana kami (SIKASIR LAUNDRY DEV) mengumpulkan, menggunakan, dan melindungi informasi Anda 
              saat menggunakan Aplikasi kami. Dengan menggunakan Aplikasi, Anda menyetujui pengumpulan dan 
              penggunaan informasi sesuai dengan kebijakan ini.
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Untuk menyediakan dan meningkatkan layanan kami, kami mengumpulkan beberapa jenis informasi:
              </p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">a. Data yang Anda Berikan Langsung</h3>
                  <p className="text-gray-600 text-sm">
                    Informasi akun pengguna (Pemilik &amp; Kasir), informasi pelanggan Anda, data transaksi, 
                    serta data stok &amp; pengeluaran.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">b. Data yang Dikumpulkan Secara Otomatis</h3>
                  <p className="text-gray-600 text-sm">
                    Informasi perangkat (model hardware, versi OS) untuk kompatibilitas dan dukungan teknis, 
                    serta data penggunaan (Log Data) untuk analitik dan peningkatan layanan.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Cara Kami Menggunakan Informasi Anda</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menyediakan dan mengelola fungsi inti Aplikasi (memproses pesanan, mengelola pelanggan, membuat laporan)</li>
                <li>Memfasilitasi komunikasi, seperti mengirim struk digital ke pelanggan Anda melalui WhatsApp</li>
                <li>Menanggapi pertanyaan, masukan, atau permintaan dukungan Anda</li>
                <li>Menganalisis data penggunaan untuk meningkatkan fungsionalitas dan pengalaman pengguna</li>
                <li>Melindungi keamanan akun Anda dan mencegah aktivitas penipuan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Berbagi dan Pengungkapan Data</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Kami sangat serius menjaga privasi data Anda. Kami tidak akan menjual atau menyewakan 
                informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam 
                situasi berikut:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><span className="font-semibold">Penyedia Layanan:</span> Kami menggunakan layanan pihak ketiga terpercaya seperti Google Firebase (Firestore, Authentication) untuk menyimpan dan mengelola data Anda secara aman.</li>
                <li><span className="font-semibold">Pemroses Pembayaran:</span> Jika Anda menggunakan fitur pembayaran, informasi transaksi akan dibagikan kepada penyedia layanan pembayaran (misalnya Midtrans) untuk memproses pembayaran.</li>
                <li><span className="font-semibold">Kewajiban Hukum:</span> Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum atau sebagai respons terhadap permintaan yang sah dari otoritas publik.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Keamanan Data</h2>
              <p className="text-gray-600 leading-relaxed">
                Keamanan data Anda adalah prioritas kami. Kami menerapkan langkah-langkah keamanan yang 
                wajar untuk melindungi informasi Anda dari akses, perubahan, pengungkapan, atau penghancuran 
                yang tidak sah. Data disimpan di server Firebase yang aman, dan data sensitif seperti kata 
                sandi dienkripsi. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet 
                atau metode penyimpanan elektronik yang 100% aman.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Izin Aplikasi</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Aplikasi kami mungkin meminta izin berikut pada perangkat Anda:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><span className="font-semibold">Penyimpanan:</span> Diperlukan untuk menyimpan file ekspor, seperti laporan dalam format Excel.</li>
                <li><span className="font-semibold">Bluetooth:</span> Diperlukan untuk menghubungkan printer thermal untuk mencetak struk.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                Kami hanya akan menggunakan izin ini untuk fungsionalitas yang disebutkan dan tidak akan 
                mengakses data pribadi Anda di luar cakupan fungsi-fungsi tersebut.
              </p>
            </section>

            <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">6. Penggunaan Cookies dan Teknologi Iklan</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Website kami (sikasirlaundry.web.id) menggunakan cookies dan teknologi serupa untuk 
                meningkatkan pengalaman pengguna dan menayangkan iklan. Secara khusus:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Kami menggunakan <span className="font-semibold">Google AdSense</span> untuk menayangkan iklan di website kami. Google menggunakan cookies untuk menayangkan iklan berdasarkan kunjungan pengguna ke website kami dan website lain di internet.</li>
                <li>Kami menggunakan <span className="font-semibold">Google Analytics</span> untuk menganalisis lalu lintas website. Google Analytics menggunakan cookies untuk mengumpulkan data tentang penggunaan website secara anonim.</li>
                <li>Pihak ketiga, termasuk Google, menggunakan cookies, web beacon, alamat IP, atau pengenal lainnya untuk mengumpulkan informasi sebagai hasil dari penayangan iklan di website kami.</li>
                <li>Penggunaan cookies oleh Google memungkinkan Google dan mitranya untuk menayangkan iklan kepada pengguna berdasarkan kunjungan mereka ke website kami dan/atau website lain di internet.</li>
                <li>Pengguna dapat memilih untuk tidak menggunakan cookie personalisasi dengan mengunjungi <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pengaturan Iklan Google</a>.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                Untuk informasi lebih lanjut tentang bagaimana Google menggunakan data saat Anda menggunakan 
                situs atau aplikasi mitra kami, silakan kunjungi:{" "}
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cara Google menggunakan data saat Anda menggunakan situs atau aplikasi mitra kami
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Privasi Anak-Anak</h2>
              <p className="text-gray-600 leading-relaxed">
                Layanan kami tidak ditujukan untuk siapa pun yang berusia di bawah 13 tahun. Kami tidak 
                secara sengaja mengumpulkan informasi identitas pribadi dari anak-anak di bawah 13 tahun. 
                Jika kami mengetahui bahwa seorang anak di bawah 13 tahun telah memberikan informasi pribadi 
                kepada kami, kami akan segera menghapusnya dari server kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Perubahan Kebijakan Privasi</h2>
              <p className="text-gray-600 leading-relaxed">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu 
                Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini. 
                Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Hubungi Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Jika Anda memiliki pertanyaan atau saran tentang Kebijakan Privasi kami, jangan ragu 
                untuk menghubungi kami di:
              </p>
              <ul className="list-none text-gray-600 space-y-1">
                <li>Email: <a href="mailto:support@sikasirlaundry.web.id" className="text-blue-600 hover:underline">support@sikasirlaundry.web.id</a></li>
                <li>WhatsApp: <a href="https://wa.me/6285144907717" target="_blank" className="text-blue-600 hover:underline">+62 851-4490-7717</a></li>
                <li>Website: <a href="https://sikasirlaundry.web.id" className="text-blue-600 hover:underline">https://sikasirlaundry.web.id</a></li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
