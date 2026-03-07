import Link from "next/link";
import Image from "next/image";
import { IBlogArticle } from "@/data/blog";

const categoryColors: Record<string, string> = {
  "Tips Bisnis": "bg-blue-100 text-blue-700",
  "Teknologi": "bg-purple-100 text-purple-700",
  "Marketing": "bg-green-100 text-green-700",
  "Manajemen": "bg-orange-100 text-orange-700",
  "Tutorial": "bg-red-100 text-red-700",
};

interface BlogGridProps {
  articles: IBlogArticle[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ articles }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group"
        >
          <article className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition h-full flex flex-col">
            <div className="h-40 relative overflow-hidden bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] flex items-center justify-center">
              <Image src="/images/hero.png" alt={article.title} width={120} height={106} className="object-contain" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
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
  );
};

export default BlogGrid;
