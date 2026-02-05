"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Apakah SIKASIR LAUNDRY gratis?",
    answer: "Ya! SIKASIR LAUNDRY menyediakan paket gratis selamanya dengan fitur dasar yang lengkap. Anda bisa mencatat transaksi, mengelola pelanggan, dan melihat laporan tanpa biaya. Untuk fitur lebih lengkap, tersedia paket premium dengan harga terjangkau."
  },
  {
    question: "Bagaimana cara download SIKASIR LAUNDRY?",
    answer: "Anda dapat mendownload SIKASIR LAUNDRY langsung dari Google Play Store secara gratis. Cukup cari 'SIKASIR LAUNDRY' di Play Store, lalu klik Install. Aplikasi akan siap digunakan dalam hitungan menit."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Keamanan data adalah prioritas kami. Semua data tersimpan di cloud dengan enkripsi dan backup otomatis setiap hari. Anda tidak perlu khawatir kehilangan data meskipun HP rusak atau hilang."
  },
  {
    question: "Bisakah digunakan offline?",
    answer: "SIKASIR LAUNDRY membutuhkan koneksi internet untuk sinkronisasi data. Namun, beberapa fitur dasar seperti melihat data transaksi yang sudah tersimpan bisa diakses secara offline."
  },
  {
    question: "Berapa banyak cabang yang bisa dikelola?",
    answer: "Paket gratis mendukung 1 outlet. Untuk mengelola banyak cabang, Anda bisa upgrade ke paket Pro atau Enterprise yang mendukung unlimited outlet dengan satu dashboard."
  },
  {
    question: "Apakah bisa cetak struk/nota?",
    answer: "Ya, SIKASIR LAUNDRY mendukung cetak struk via printer thermal Bluetooth. Anda juga bisa mengirim nota digital via WhatsApp langsung ke pelanggan."
  },
  {
    question: "Bagaimana cara tracking laundry untuk pelanggan?",
    answer: "Setiap transaksi memiliki kode unik yang bisa dibagikan ke pelanggan. Pelanggan dapat mengecek status laundry mereka melalui link tracking yang disediakan tanpa perlu install aplikasi."
  },
  {
    question: "Apakah ada fitur laporan keuangan?",
    answer: "Tentu! SIKASIR LAUNDRY menyediakan laporan keuangan otomatis meliputi laporan harian, mingguan, dan bulanan. Anda bisa melihat pendapatan, pengeluaran, dan profit dengan mudah."
  },
  {
    question: "Bagaimana jika butuh bantuan?",
    answer: "Tim support kami siap membantu via WhatsApp di jam kerja. Anda juga bisa mengirim email ke support@sikasirlaundry.web.id untuk pertanyaan yang lebih detail."
  },
  {
    question: "Apakah bisa mengelola karyawan?",
    answer: "Ya, Anda bisa menambahkan karyawan dengan akses terbatas. Setiap karyawan bisa login dengan akun sendiri dan aktivitas mereka tercatat untuk memudahkan monitoring."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Temukan jawaban untuk pertanyaan umum tentang SIKASIR LAUNDRY
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <FaChevronDown 
                    className={`text-gray-500 transition-transform flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-blue-50 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Masih punya pertanyaan?</h2>
            <p className="text-gray-600 mb-4">
              Tim kami siap membantu Anda!
            </p>
            <a 
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
