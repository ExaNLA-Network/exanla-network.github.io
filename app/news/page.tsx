'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Next/Image
import { newsArticlesData, type NewsArticleData } from './news-data';

// Function to format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function NewsPage() {
  // Sort articles by date, most recent first
  const sortedArticles = [...newsArticlesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedArticles.map((item: NewsArticleData) => (
          <div key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            {item.imageUrl && (
              <div className="flex-shrink-0 h-48 w-full relative">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                {item.categories.map((category) => (
                  <span 
                    key={category}
                    className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <Link href={`/news/${item.slug}`} className="block mt-1">
                <p className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-150">{item.title}</p>
                <p className="mt-3 text-base text-gray-500">{item.summary}</p>
              </Link>
              <div className="mt-6 flex items-center">
                <div className="text-sm text-gray-500">
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 