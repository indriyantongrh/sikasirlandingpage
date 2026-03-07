import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";
import { supabase, BlogPost } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog - Tips & Panduan Usaha Laundry",
  description: "Baca artikel terbaru seputar tips usaha laundry, panduan menggunakan aplikasi kasir, dan strategi mengembangkan bisnis laundry Anda.",
  alternates: { canonical: "https://sikasirlaundry.web.id/blog" },
  openGraph: {
    title: "Blog - Tips & Panduan Usaha Laundry | SIKASIR LAUNDRY",
    description: "Baca artikel terbaru seputar tips usaha laundry, panduan menggunakan aplikasi kasir, dan strategi mengembangkan bisnis laundry Anda.",
    url: "https://sikasirlaundry.web.id/blog",
    siteName: "SIKASIR LAUNDRY",
    locale: "id_ID",
    type: "website",
  },
};

const POSTS_PER_PAGE = 6;

const categoryColors: Record<string, string> = {
  "Tips Bisnis": "bg-blue-100 text-blue-700",
  "Teknologi": "bg-purple-100 text-purple-700",
  "Marketing": "bg-green-100 text-green-700",
  "Manajemen": "bg-orange-100 text-orange-700",
  "Tutorial": "bg-red-100 text-red-700",
};

async function getPosts(page: number) {
  const offset = (page - 1) * POSTS_PER_PAGE;
  const { data, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1);

  return {
    posts: (data as BlogPost[]) || [],
    totalPages: Math.ceil((count || 0) / POSTS_PER_PAGE),
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1");
  const { posts, totalPages } = await getPosts(currentPage);

  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Blog SIKASIR LAUNDRY
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Tips, panduan, dan insight untuk mengembangkan usaha laundry Anda
          </p>

          {/* Filter Kategori */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Link href="/blog" className="text-xs px-3 py-1.5 rounded-full border bg-blue-600 text-white border-blue-600">
              Semua
            </Link>
            <Link href="/blog/kategori/tips-bisnis" className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-100 transition">
              Tips Bisnis
            </Link>
            <Link href="/blog/kategori/teknologi" className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-100 transition">
              Teknologi
            </Link>
            <Link href="/blog/kategori/marketing" className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-100 transition">
              Marketing
            </Link>
            <Link href="/blog/kategori/manajemen" className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-100 transition">
              Manajemen
            </Link>
            <Link href="/blog/kategori/tutorial" className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-100 transition">
              Tutorial
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada artikel.</p>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
                >
                  ← Prev
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className={`px-3 py-2 text-sm rounded-lg border transition ${
                    page === currentPage ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
                >
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
