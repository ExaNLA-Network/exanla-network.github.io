'use client';

import Image from 'next/image';
import { useState } from 'react';
import { libraryCategories, libraries, Library, LibraryCategoryValue } from './libraries-data';

// Helper function to get category styles
function getCategoryStyle(category: LibraryCategoryValue) {
  switch (category) {
    case libraryCategories.DENSE_LINEAR_ALGEBRA:
      return 'bg-sky-100 text-sky-800';
    case libraryCategories.SPARSE_LINEAR_ALGEBRA:
      return 'bg-emerald-100 text-emerald-800';
    case libraryCategories.EIGENVALUE_PROBLEMS:
      return 'bg-violet-100 text-violet-800';
    case libraryCategories.HIGH_PERFORMANCE_COMPUTING:
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function LibrariesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<LibraryCategoryValue[]>([]);

  // Get all unique keywords from library categories
  const allKeywords = Object.values(libraryCategories);

  // Filter libraries based on selected keywords (AND logic)
  const filteredLibraries = libraries.filter((library: Library) => 
    selectedKeywords.every((keyword: LibraryCategoryValue) => 
      library.categories.includes(keyword)
    )
  );

  // Calculate category distribution
  const categoryCounts = libraries.reduce((acc: Record<LibraryCategoryValue, number>, lib: Library) => {
    lib.categories.forEach((category: LibraryCategoryValue) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<LibraryCategoryValue, number>);

  const allCategories = Object.values(libraryCategories);

  const handleKeywordToggle = (keyword: LibraryCategoryValue) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    setSelectedKeywords([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Libraries</h1>

      {/* Collapsible Filter Section */}
      <div className="mb-8">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full px-6 py-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
        >
          <span className="font-semibold text-lg text-blue-800">Filter Libraries</span>
          <span className="text-blue-600">
            {isFilterOpen ? '▼' : '▶'}
          </span>
        </button>

        {isFilterOpen && (
          <div className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Filter by Categories</h3>
              {selectedKeywords.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allKeywords.map((keyword: LibraryCategoryValue) => (
                <button
                  key={keyword}
                  onClick={() => handleKeywordToggle(keyword)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedKeywords.includes(keyword)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
            {selectedKeywords.length > 0 && (
              <div className="mt-4 text-sm text-blue-700">
                Showing libraries that match ALL selected categories
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {filteredLibraries.map((library: Library) => (
          <div key={library.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex gap-8">
                {/* Left side: Logo and Website */}
                <div className="flex-shrink-0 w-48 flex flex-col items-center">
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={library.logo}
                      alt={`${library.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a 
                    href={library.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm text-center"
                  >
                    Visit Website →
                  </a>
                </div>

                {/* Right side: Content */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-4">{library.name}</h2>
                  <p className="text-gray-600 mb-4">{library.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {library.categories.map((category: LibraryCategoryValue) => (
                      <span
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(category)}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {library.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Language</span>
                        <p className="text-gray-900">{library.language}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">License</span>
                        <p className="text-gray-900">{library.license}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Library Category Distribution Section */}
      <div className="mt-16 pt-10 border-t border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Library Category Distribution</h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-500">
            Overview of library categorizations.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {allCategories.map((category: LibraryCategoryValue) => (
            <div key={category} className={`p-4 rounded-lg shadow-md ${getCategoryStyle(category).replace('text-', 'bg-').replace('-800', '-100').replace('-100', '-50')} border border-gray-200`}>
              <h3 className={`text-lg font-medium ${getCategoryStyle(category).split(' ')[1]}`}>{category}</h3>
              <p className={`mt-1 text-3xl font-semibold ${getCategoryStyle(category).split(' ')[1]}`}>
                {categoryCounts[category] || 0}
              </p>
              <p className={`text-sm ${getCategoryStyle(category).split(' ')[1]} opacity-75`}>
                {categoryCounts[category] === 1 ? 'Library' : 'Libraries'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 