import { Metadata } from "next";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, BlogPost } from "@/lib/supabase";

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data as BlogPost | null;
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  // Ambil 3 artikel dari kategori yang sama
  const { data: sameCat } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(3);

  const related = (sameCat as BlogPost[]) || [];

  // Kalau kurang dari 3, tambah dari kategori lain
  if (related.length < 3) {
    const excludeSlugs = [currentSlug, ...related.map(p => p.slug)];
    const { data: others } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .not("slug", "in", `(${excludeSlugs.join(",")})`)
      .order("created_at", { ascending: false })
      .limit(3 - related.length);
    if (others) related.push(...(others as BlogPost[]));
  }

  return related;
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  const url = `https://sikasirlaundry.web.id/blog/${params.slug}`;
  return {
    title: post.title,
    description: post.excerpt || "",
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url,
      type: "article",
      siteName: "SIKASIR LAUNDRY",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  "Tips Bisnis": "bg-blue-100 text-blue-700",
  "Teknologi": "bg-purple-100 text-purple-700",
  "Marketing": "bg-green-100 text-green-700",
  "Manajemen": "bg-orange-100 text-orange-700",
  "Tutorial": "bg-red-100 text-red-700",
};

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "SIKASIR LAUNDRY" },
    publisher: {
      "@type": "Organization",
      name: "SIKASIR LAUNDRY",
      logo: { "@type": "ImageObject", url: "https://sikasirlaundry.web.id/images/logo-skl.png" },
    },
  };

  return (
    <div className="py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Kembali ke Blog</Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Link href={`/blog/kategori/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition">{post.category}</Link>
            <span className="text-sm text-gray-500">{post.read_time} baca</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">{formatDate(post.created_at)}</p>

          <div className="prose prose-lg max-w-none">
            {post.content.split("\n").map((line, i) => {
              const t = line.trim();
              if (!t) return null;
              if (t.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold mt-8 mb-4">{t.replace("## ", "")}</h2>;
              if (t.startsWith("- ")) return <li key={i} className="text-gray-600 ml-4">{t.replace("- ", "")}</li>;
              return <p key={i} className="text-gray-600 mb-4">{t}</p>;
            })}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Kelola Usaha Laundry Lebih Mudah!</h3>
            <p className="text-gray-600 mb-4">Download SIKASIR LAUNDRY sekarang dan rasakan kemudahan mengelola bisnis laundry Anda.</p>
            <a
              href="https://play.google.com/store/apps/details?id=com.sikasir.laundry.sikasirlaundry"
              target="_blank"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download Gratis
            </a>
          </div>
        </article>

        {/* Artikel Terkait */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                  <div className="border rounded-xl overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                    <div className="h-28 relative overflow-hidden bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] flex items-center justify-center">
                      <Image src="/images/hero.png" alt={rp.title} width={90} height={80} className="object-contain" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <span className={`text-xs px-2 py-0.5 rounded w-fit mb-2 ${categoryColors[rp.category] || "bg-gray-100 text-gray-700"}`}>
                        {rp.category}
                      </span>
                      <h3 className="font-semibold text-sm group-hover:text-blue-600 transition line-clamp-2">{rp.title}</h3>
                      <p className="text-xs text-gray-400 mt-auto pt-2">{rp.read_time}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
