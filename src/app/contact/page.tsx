import { Metadata } from "next";
import Container from "@/components/Container";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim SIKASIR LAUNDRY untuk pertanyaan, saran, atau bantuan teknis. Kami siap membantu Anda!",
};

export default function ContactPage() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Informasi Kontak</h2>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <FaWhatsapp className="text-green-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a 
                    href="https://wa.me/6285144907717" 
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    +62 851-4490-7717
                  </a>
                  <p className="text-sm text-gray-500">Respon cepat di jam kerja</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <FaEnvelope className="text-blue-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:support@sikasirlaundry.web.id"
                    className="text-blue-600 hover:underline"
                  >
                    support@sikasirlaundry.web.id
                  </a>
                  <p className="text-sm text-gray-500">Untuk pertanyaan umum & kerjasama</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg">
                <FaInstagram className="text-pink-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <a 
                    href="https://instagram.com/sikasirlaundry" 
                    target="_blank"
                    className="text-pink-600 hover:underline"
                  >
                    @sikasirlaundry
                  </a>
                  <p className="text-sm text-gray-500">Follow untuk tips & update</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-red-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Lokasi</h3>
                  <p className="text-gray-600">Jakarta, Indonesia</p>
                  <p className="text-sm text-gray-500">Layanan online seluruh Indonesia</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h2 className="text-xl font-semibold mb-4">Kirim Pesan</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjek
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Pertanyaan Umum</option>
                    <option>Bantuan Teknis</option>
                    <option>Saran & Masukan</option>
                    <option>Kerjasama Bisnis</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-12 text-center bg-gray-50 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum?</h2>
            <p className="text-gray-600 mb-4">
              Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami.
            </p>
            <a 
              href="/faq"
              className="inline-block text-blue-600 font-semibold hover:underline"
            >
              Lihat FAQ →
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
