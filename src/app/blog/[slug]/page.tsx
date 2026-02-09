import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/blog";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };

  const url = `https://sikasirlaundry.web.id/blog/${params.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.date,
      siteName: "SIKASIR LAUNDRY",
      locale: "id_ID",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "SIKASIR LAUNDRY",
      url: "https://sikasirlaundry.web.id",
    },
    publisher: {
      "@type": "Organization",
      name: "SIKASIR LAUNDRY",
      logo: {
        "@type": "ImageObject",
        url: "https://sikasirlaundry.web.id/images/logo-skl.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sikasirlaundry.web.id/blog/${params.slug}`,
    },
  };

  return (
    <div className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">
              ← Kembali ke Blog
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">{article.readTime} baca</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <p className="text-gray-500 mb-8">{article.date}</p>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n").map((line, index) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) {
                return <h2 key={index} className="text-xl font-semibold mt-8 mb-4">{trimmed.replace("## ", "")}</h2>;
              }
              if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                return <p key={index} className="font-semibold mt-4">{trimmed.replace(/\*\*/g, "")}</p>;
              }
              if (trimmed.startsWith("- ")) {
                return <li key={index} className="text-gray-600 ml-4">{trimmed.replace("- ", "")}</li>;
              }
              return <p key={index} className="text-gray-600 mb-4">{trimmed}</p>;
            })}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Kelola Usaha Laundry Lebih Mudah!</h3>
            <p className="text-gray-600 mb-4">
              Download SIKASIR LAUNDRY sekarang dan rasakan kemudahan mengelola bisnis laundry Anda.
            </p>
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
