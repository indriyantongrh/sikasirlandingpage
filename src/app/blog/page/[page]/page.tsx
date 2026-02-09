import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import BlogGrid from "@/components/BlogGrid";
import Pagination from "@/components/Pagination";
import { getArticlesByPage, getTotalPages } from "@/data/blog";

export async function generateStaticParams() {
  const totalPages = getTotalPages();
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  })).filter(p => p.page !== "1"); // page 1 is /blog
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  return {
    title: `Blog - Halaman ${params.page} | Tips & Panduan Usaha Laundry`,
    description: "Baca artikel terbaru seputar tips usaha laundry, panduan menggunakan aplikasi kasir, dan strategi mengembangkan bisnis laundry Anda.",
    alternates: {
      canonical: `https://sikasirlaundry.web.id/blog/page/${params.page}`,
    },
    robots: {
      index: false, // Hindari duplicate content untuk halaman pagination
      follow: true,
    },
  };
}

export default function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const currentPage = parseInt(params.page, 10);
  const totalPages = getTotalPages();

  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  // Redirect page 1 to /blog
  if (currentPage === 1) {
    notFound();
  }

  const pageArticles = getArticlesByPage(currentPage);

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

          <BlogGrid articles={pageArticles} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </Container>
    </div>
  );
}
