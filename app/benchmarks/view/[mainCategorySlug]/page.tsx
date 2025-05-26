import Link from 'next/link';
import { benchmarksData } from '../../../benchmarks/benchmarks-data';
import { BenchmarkResultItem, BenchmarkMainCategories, BenchmarkMainCategoryValue } from '../../benchmarks-data';
import { notFound } from 'next/navigation';

// Helper function to create a slug from a category name
const categoryToSlug = (categoryName: string): string => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Helper function to get category name from slug
const slugToCategoryName = (slug: string): BenchmarkMainCategoryValue | undefined => {
  for (const key in BenchmarkMainCategories) {
    const categoryName = BenchmarkMainCategories[key as keyof typeof BenchmarkMainCategories];
    if (categoryToSlug(categoryName) === slug) {
      return categoryName;
    }
  }
  return undefined;
};

export async function generateStaticParams() {
  const mainCategorySlugs = Array.from(new Set(benchmarksData.map(b => categoryToSlug(b.mainCategory))));
  return mainCategorySlugs.map(slug => ({ mainCategorySlug: slug }));
}

type PageProps = {
  params: Promise<{ mainCategorySlug: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const mainCategoryName = slugToCategoryName(resolvedParams.mainCategorySlug);

  if (!mainCategoryName) {
    notFound();
  }

  const categoryBenchmarks = benchmarksData.filter(benchmark => benchmark.mainCategory === mainCategoryName);

  if (categoryBenchmarks.length === 0) {
    // This case should ideally not be reached if generateStaticParams is correct
    // and benchmarksData is not empty for existing categories.
    return (
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-500">No benchmarks found for this category.</p>
          <Link href="/benchmarks" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            &larr; Back to Benchmark Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">{mainCategoryName}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Detailed performance analysis for {mainCategoryName.toLowerCase()}.
          </p>
          <div className="mt-6">
            <Link href="/benchmarks" className="text-blue-600 hover:text-blue-800 transition-colors">
                &larr; Back to Benchmark Categories
            </Link>
          </div>
        </div>

        <div className="space-y-16">
          {categoryBenchmarks.map((benchmark, benchIndex) => {
            const tableHeaders = benchmark.results.length > 0 ? Object.keys(benchmark.results[0]) : [];
            return (
              <article key={benchmark.id} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <header className="mb-6 border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-semibold text-blue-700 sm:text-3xl">{benchmark.title}</h2>
                  {benchmark.summary && <p className="mt-1 text-md text-gray-500">{benchmark.summary}</p>}
                </header>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Problem Description</h3>
                    <div className="prose prose-blue max-w-none text-gray-600">
                      <p>{benchmark.problemDescription}</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Results</h3>
                    {benchmark.results.length > 0 ? (
                      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              {tableHeaders.map((key) => (
                                <th
                                  key={key}
                                  scope="col"
                                  className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                                >
                                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {benchmark.results.map((resultItem: BenchmarkResultItem, index: number) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                {tableHeaders.map((header) => (
                                  <td key={header} className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {String(resultItem[header as keyof BenchmarkResultItem] || '')}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-600">No results available for this benchmark yet.</p>
                    )}
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Chart</h3>
                    <div className="mt-4 h-80 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                      <span className="text-gray-500 text-lg">
                        {benchmark.chartType ? `${benchmark.chartType.charAt(0).toUpperCase() + benchmark.chartType.slice(1)} chart visualising` : 'Chart visualising'} data for: {benchmark.title}
                      </span>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Analysis</h3>
                    <div className="prose prose-blue max-w-none text-gray-600">
                      <p>{benchmark.analysis}</p>
                    </div>
                  </section>
                </div>
                {benchIndex < categoryBenchmarks.length - 1 && (
                    <hr className="mt-12 border-gray-300" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
} 