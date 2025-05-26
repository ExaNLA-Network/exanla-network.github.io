import { newsArticlesData, NewsArticleData } from '../news-data';
import Link from 'next/link';
import Image from 'next/image'; // Using Next/Image for individual articles
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

// Function to format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper to get a consistent color for category tags
const getCategoryStyle = () => {
  return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
};

// This function tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  return newsArticlesData.map((article: NewsArticleData) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = newsArticlesData.find((a: NewsArticleData) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-3">{article.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
              <p className="mr-4">
                Published on <time dateTime={article.date}>{formatDate(article.date)}</time>
              </p>
              <div className="flex flex-wrap gap-2">
                {article.categories.map((category) => (
                  <span 
                    key={category} 
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getCategoryStyle()}`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {article.imageUrl && (
            <div className="mb-8 relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority // Prioritize loading for LCP element if it's often above the fold
              />
            </div>
          )}

          {/* Render full content - basic paragraph splitting */}
          <div className="prose prose-lg prose-blue max-w-none text-gray-700">
            {article.fullContent.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/news" className="text-blue-600 hover:text-blue-700 font-medium">
            &larr; Back to all news
          </Link>
        </div>
      </div>
    </div>
  );
} 