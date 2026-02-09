import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
          className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
          aria-label="Halaman sebelumnya"
        >
          ← Prev
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? "/blog" : `/blog/page/${page}`}
          className={`px-3 py-2 text-sm rounded-lg border transition ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100"
          }`}
          aria-label={`Halaman ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/blog/page/${currentPage + 1}`}
          className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
          aria-label="Halaman berikutnya"
        >
          Next →
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
