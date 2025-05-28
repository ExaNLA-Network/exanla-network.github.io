'use client';

import Image from 'next/image';
import { useState } from 'react';
import { libraryCategories, libraries, Library, LibraryCategoryValue } from './libraries-data';

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
      <h1 className="text-3xl font-bold mb-8 text-[#003D66]">Libraries</h1>

      {/* Collapsible Filter Section */}
      <div className="mb-8">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full px-6 py-3 text-left bg-[#003D66] rounded-lg hover:bg-[#002d4d] transition-colors text-white"
        >
          <span className="font-semibold text-lg">Filter Libraries</span>
          <span>
            {isFilterOpen ? '▼' : '▶'}
          </span>
        </button>

        {isFilterOpen && (
          <div className="mt-4 p-6 bg-[#003D66] rounded-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter by Categories</h3>
              {selectedKeywords.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-300 hover:text-white"
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
                      ? 'bg-[#FFA500] text-white shadow-md'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
            {selectedKeywords.length > 0 && (
              <div className="mt-4 text-sm text-gray-300">
                Showing libraries that match ALL selected categories
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {filteredLibraries.map((library: Library) => (
          <div key={library.id} className="bg-[#003D66] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Logo and Website Section */}
                <div className="flex flex-col items-center md:w-48">
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={library.logo}
                      alt={`${library.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href={library.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 text-sm text-center transition-colors duration-150"
                    >
                      Visit Website →
                    </a>
                    {library.repository && (
                      <a 
                        href={library.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 text-sm text-center transition-colors duration-150 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-4 text-white">{library.name}</h2>
                  <p className="text-gray-200 mb-4">{library.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {library.categories.map((category: LibraryCategoryValue) => (
                      <span
                        key={category}
                        className="px-3 py-1 rounded-full text-sm bg-gray-300 text-gray-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-white mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                      {library.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-300">Language</span>
                        <p className="text-white">{library.language}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-300">License</span>
                        <p className="text-white">{library.license}</p>
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
          <h2 className="text-2xl font-bold text-[#003D66] sm:text-3xl">Library Category Distribution</h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600">
            Overview of library categorizations.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {allCategories.map((category: LibraryCategoryValue) => (
            <div key={category} className="p-4 rounded-lg shadow-md bg-[#003D66] text-white border border-gray-200">
              <h3 className="text-lg font-medium">{category}</h3>
              <p className="mt-1 text-3xl font-semibold">
                {categoryCounts[category] || 0}
              </p>
              <p className="text-sm text-gray-300">
                {categoryCounts[category] === 1 ? 'Library' : 'Libraries'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 