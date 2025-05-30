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
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Benchmark Categories</h1>
          <p className="mt-4 text-xl text-gray-600">
            Select a category to view detailed performance benchmarks.
          </p>
        </div>

        {mainCategories.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {mainCategories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/benchmarks/view/${category.slug}`}
                className="block bg-[#003D66] rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="mt-2 text-gray-200">Explore {category.count} detailed benchmark(s) related to {category.name.toLowerCase()}</p>
                  <div className="mt-6">
                    <span className="text-lg font-medium text-white group">
                      View Benchmarks <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600">No benchmark categories available yet. Please check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
} 