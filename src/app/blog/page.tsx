import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Tips & Panduan Usaha Laundry",
  description: "Baca artikel terbaru seputar tips usaha laundry, panduan menggunakan aplikasi kasir, dan strategi mengembangkan bisnis laundry Anda.",
};

const articles = [
  {
    slug: "cara-memulai-usaha-laundry",
    title: "Cara Memulai Usaha Laundry dari Nol untuk Pemula",
    excerpt: "Panduan lengkap memulai bisnis laundry dengan modal kecil. Pelajari langkah-langkah, peralatan yang dibutuhkan, dan tips sukses.",
    date: "1 Februari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit"
  },
  {
    slug: "keuntungan-aplikasi-kasir-laundry",
    title: "5 Keuntungan Menggunakan Aplikasi Kasir untuk Usaha Laundry",
    excerpt: "Mengapa usaha laundry modern perlu aplikasi kasir digital? Simak keuntungannya untuk efisiensi dan pertumbuhan bisnis.",
    date: "28 Januari 2026",
    category: "Teknologi",
    readTime: "4 menit"
  },
  {
    slug: "tips-meningkatkan-pelanggan-laundry",
    title: "7 Tips Ampuh Meningkatkan Jumlah Pelanggan Laundry",
    excerpt: "Strategi marketing efektif untuk menarik lebih banyak pelanggan ke usaha laundry Anda. Dari promosi hingga layanan prima.",
    date: "25 Januari 2026",
    category: "Marketing",
    readTime: "6 menit"
  },
  {
    slug: "cara-menghitung-harga-laundry",
    title: "Cara Menghitung Harga Laundry yang Tepat dan Kompetitif",
    excerpt: "Panduan menentukan harga jasa laundry kiloan dan satuan. Perhitungkan biaya operasional dan margin keuntungan.",
    date: "20 Januari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit"
  },
  {
    slug: "mengelola-karyawan-laundry",
    title: "Tips Mengelola Karyawan Laundry agar Produktif",
    excerpt: "Cara efektif mengatur jadwal, pembagian tugas, dan memotivasi karyawan laundry untuk hasil kerja maksimal.",
    date: "15 Januari 2026",
    category: "Manajemen",
    readTime: "4 menit"
  },
  {
    slug: "peralatan-wajib-usaha-laundry",
    title: "Daftar Peralatan Wajib untuk Memulai Usaha Laundry",
    excerpt: "Rekomendasi mesin cuci, pengering, setrika, dan perlengkapan lainnya untuk usaha laundry pemula hingga profesional.",
    date: "10 Januari 2026",
    category: "Tips Bisnis",
    readTime: "5 menit"
  }
];

export default function BlogPage() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Blog SIKASIR LAUNDRY
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Tips, panduan, dan insight untuk mengembangkan usaha laundry Anda
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link 
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group"
              >
                <article className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-4xl">📝</span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <h2 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-gray-400">{article.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
