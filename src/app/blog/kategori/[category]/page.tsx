import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase, BlogPost } from "@/lib/supabase";

const categories: Record<string, { name: string; description: string; color: string }> = {
  "tips-bisnis": {
    name: "Tips Bisnis",
    description: "Kumpulan tips dan strategi untuk mengembangkan usaha laundry Anda agar lebih sukses dan menguntungkan.",
    color: "bg-blue-100 text-blue-700",
  },
  "teknologi": {
    name: "Teknologi",
    description: "Artikel seputar teknologi terbaru yang bisa membantu operasional dan efisiensi bisnis laundry.",
    color: "bg-purple-100 text-purple-700",
  },
  "marketing": {
    name: "Marketing",
    description: "Panduan pemasaran dan promosi untuk menarik lebih banyak pelanggan ke usaha laundry Anda.",
    color: "bg-green-100 text-green-700",
  },
  "manajemen": {
    name: "Manajemen",
    description: "Tips mengelola keuangan, karyawan, dan operasional usaha laundry secara profesional.",
    color: "bg-orange-100 text-orange-700",
  },
  "tutorial": {
    name: "Tutorial",
    description: "Panduan langkah demi langkah menggunakan fitur-fitur SIKASIR LAUNDRY untuk bisnis Anda.",
    color: "bg-red-100 text-red-700",
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
  const cat = categories[params.category];
  if (!cat) return { title: "Kategori Tidak Ditemukan" };

  const url = `https://sikasirlaundry.web.id/blog/kategori/${params.category}`;
  return {
    title: `${cat.name} - Blog Usaha Laundry`,
    description: cat.description,
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

async function getPostsByCategory(categoryName: string, page: number) {
  const perPage = 9;
  const offset = (page - 1) * perPage;
  const { data, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .eq("category", categoryName)
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  return {
    posts: (data as BlogPost[]) || [],
    totalPages: Math.ceil((count || 0) / perPage),
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  const cat = categories[params.category];
  if (!cat) notFound();

  const currentPage = parseInt(searchParams.page || "1");
  const { posts, totalPages } = await getPostsByCategory(cat.name, currentPage);

  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Kembali ke Blog</Link>
          </div>

          <div className="text-center mb-12">
            <span className={`inline-block text-sm px-3 py-1 rounded mb-4 ${cat.color}`}>{cat.name}</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Artikel {cat.name} Usaha Laundry
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{cat.description}</p>
          </div>

          {/* Kategori lain */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.entries(categories).map(([slug, c]) => (
              <Link
                key={slug}
                href={`/blog/kategori/${slug}`}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  slug === params.category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada artikel di kategori ini.</p>
          ) : (
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
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link href={`/blog/kategori/${params.category}?page=${currentPage - 1}`} className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition">
                  ← Prev
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/blog/kategori/${params.category}?page=${page}`}
                  className={`px-3 py-2 text-sm rounded-lg border transition ${page === currentPage ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}`}
                >
                  {page}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`/blog/kategori/${params.category}?page=${currentPage + 1}`} className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition">
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>
      </Container>
    </div>
  );
}
