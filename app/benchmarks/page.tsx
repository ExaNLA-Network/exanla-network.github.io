import Link from 'next/link';
import { benchmarksData } from './benchmarks-data';

// Helper function to create a slug from a category name
const categoryToSlug = (categoryName: string): string => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Get unique main categories and their slugs
const mainCategories = Array.from(new Set(benchmarksData.map(b => b.mainCategory)))
  .map(categoryName => ({
    name: categoryName,
    slug: categoryToSlug(categoryName),
    // Count how many benchmarks are in this category
    count: benchmarksData.filter(b => b.mainCategory === categoryName).length
  }));

export default function BenchmarksOverviewPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Benchmark Categories</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a category to view detailed performance benchmarks.
          </p>
        </div>

        {mainCategories.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {mainCategories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/benchmarks/view/${category.slug}`}
                className="block p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <h2 className="text-2xl font-semibold text-blue-700 hover:text-blue-800">{category.name}</h2>
                <p className="mt-2 text-gray-600">Explore {category.count} detailed benchmark(s) related to {category.name.toLowerCase()}</p>
                <div className="mt-6">
                  <span className="text-lg font-medium text-blue-600 hover:text-blue-700 group">
                    View Benchmarks <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </span>
                </div>
              </Link>
          ))}
        </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-500">No benchmark categories available yet. Please check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
} 