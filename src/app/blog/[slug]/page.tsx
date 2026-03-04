import { Metadata } from "next";
import Container from "@/components/Container";
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

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

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
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">{post.category}</span>
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
      </Container>
    </div>
  );
}
