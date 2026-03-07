import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase, BlogPost } from "@/lib/supabase";
import AdBanner from "@/components/AdBanner";

const categoryMap: Record<string, { name: string; description: string; keywords: string[] }> = {
  "tips-bisnis": {
    name: "Tips Bisnis",
    description: "Kumpulan tips dan strategi bisnis laundry untuk meningkatkan omset, menarik pelanggan baru, dan mengembangkan usaha laundry Anda.",
    keywords: ["tips bisnis laundry", "strategi usaha laundry", "cara meningkatkan omset laundry", "tips sukses bisnis laundry"],
  },
  "teknologi": {
    name: "Teknologi",
    description: "Artikel seputar teknologi terbaru untuk usaha laundry, termasuk aplikasi kasir, sistem POS, dan digitalisasi bisnis laundry.",
    keywords: ["teknologi laundry", "aplikasi kasir laundry", "digitalisasi laundry", "POS laundry"],
  },
  "marketing": {
    name: "Marketing",
    description: "Panduan marketing dan promosi untuk usaha laundry. Pelajari cara efektif mempromosikan bisnis laundry Anda secara online dan offline.",
    keywords: ["marketing laundry", "promosi usaha laundry", "cara promosi laundry", "strategi marketing laundry"],
  },
  "manajemen": {
    name: "Manajemen",
    description: "Tips manajemen usaha laundry meliputi pengelolaan keuangan, karyawan, stok, dan operasional harian agar bisnis berjalan efisien.",
    keywords: ["manajemen laundry", "kelola keuangan laundry", "manajemen karyawan laundry", "operasional laundry"],
  },
  "tutorial": {
    name: "Tutorial",
    description: "Tutorial lengkap penggunaan aplikasi SIKASIR LAUNDRY dan panduan praktis untuk mengelola usaha laundry Anda.",
    keywords: ["tutorial sikasir laundry", "cara pakai aplikasi laundry", "panduan kasir laundry", "tutorial aplikasi laundry"],
  },
};

const categoryColors: Record<string, string> = {
  "Tips Bisnis": "bg-blue-100 text-blue-700",
  "Teknologi": "bg-purple-100 text-purple-700",
  "Marketing": "bg-green-100 text-green-700",
  "Manajemen": "bg-orange-100 text-orange-700",
  "Tutorial": "bg-red-100 text-red-700",
};


export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = categoryMap[params.category];
  if (!cat) return { title: "Kategori Tidak Ditemukan" };

  const url = `https://sikasirlaundry.web.id/blog/kategori/${params.category}`;
  return {
    title: `${cat.name} - Blog Usaha Laundry`,
    description: cat.description,
    keywords: cat.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.name} - Blog Usaha Laundry | SIKASIR LAUNDRY`,
      description: cat.description,
      url,
      siteName: "SIKASIR LAUNDRY",
      locale: "id_ID",
      type: "website",
    },
  };
}

async function getPostsByCategory(categoryName: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("category", categoryName)
    .order("created_at", { ascending: false });
  return (data as BlogPost[]) || [];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = categoryMap[params.category];
  if (!cat) notFound();

  const posts = await getPostsByCategory(cat.name);
  const allCategories = Object.entries(categoryMap);

  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Kembali ke Blog</Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {cat.name}
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {cat.description}
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allCategories.map(([slug, c]) => (
              <Link
                key={slug}
                href={`/blog/kategori/${slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  slug === params.category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada artikel di kategori ini.</p>
          ) : (
            <>
            {/* Ad Banner atas */}
            <AdBanner slot="4120352116" format="horizontal" className="mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                    <div className="h-40 relative overflow-hidden bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] flex items-center justify-center">
                      <Image src="/images/hero.png" alt={post.title} width={120} height={106} className="object-contain" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs px-2 py-1 rounded ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.read_time}</span>
                      </div>
                      <h2 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-gray-400">{formatDate(post.created_at)}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            {/* Ad Banner bawah */}
            <AdBanner slot="4120352117" format="auto" className="mt-8" />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
