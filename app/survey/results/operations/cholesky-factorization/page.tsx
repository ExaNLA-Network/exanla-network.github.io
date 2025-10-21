'use client';

import { useState, useEffect } from 'react';

interface CholeskyResponse {
  application: string;
  useCase: string;
  displayName: string;
  responses: {
    [key: string]: string | string[] | boolean | undefined;
  };
}

const formatValue = (value: string | string[] | boolean | undefined): string => {
  if (value === undefined || value === null) return 'Not specified';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
};

const formatValueWithOther = (questionId: string, value: string | string[] | boolean | undefined, currentResponse: Record<string, unknown>): string => {
  const baseValue = formatValue(value);
  const otherKey = `${questionId}-other`;
  const otherValue = currentResponse[otherKey];
  if (otherValue && String(otherValue).trim() !== '') {
    if (baseValue.includes('Other (please specify):')) {
      return baseValue.replace('Other (please specify):', `Other: ${String(otherValue)}`);
    }
    return `${baseValue}, Other: ${String(otherValue)}`;
  }
  return baseValue;
};

// Categorized questions for Cholesky Factorization
const choleskyQuestionCategories = [
  {
    title: "Matrix Properties",
    description: "Structural and numerical properties of matrices for Cholesky factorization",
    questionGroups: [
      {
        title: "Matrix Properties",
        questions: [
          { id: 'cholesky-diagonal-dominance', title: 'Diagonal Dominance', description: 'Whether matrices are diagonally dominant' },
          { id: 'cholesky-condition-number', title: 'Condition Number', description: 'Numerical conditioning of matrices' },
          { id: 'cholesky-sparsity-structure', title: 'Matrix Structure', description: 'Structural format and properties of matrices' }
        ]
      }
    ]
  },
  {
    title: "Matrix Distribution & Storage",
    description: "How matrices are distributed and stored across processes",
    questionGroups: [
      {
        title: "Matrix Distribution & Storage",
        questions: [
          { id: 'cholesky-matrix-distribution', title: 'Matrix Distribution', description: 'How matrices are distributed across processes/nodes' },
          { id: 'cholesky-matrix-format', title: 'Matrix Storage Format', description: 'Storage formats used for matrices' }
        ]
      }
    ]
  },
  {
    title: "Problem Scale & Precision",
    description: "Matrix dimensions and numerical precision requirements",
    questionGroups: [
      {
        title: "Problem Scale & Precision",
        questions: [
          { id: 'cholesky-matrix-size', title: 'Matrix Dimensions', description: 'Typical matrix sizes for factorization' },
          { id: 'cholesky-factorization-tolerance', title: 'Factorization Tolerance', description: 'Required accuracy for factorization' },
          { id: 'cholesky-precision-type', title: 'Working Precision', description: 'Numerical precision used or needed' }
        ]
      }
    ]
  },
  {
    title: "Workload Characteristics",
    description: "Computation patterns and resource requirements",
    questions: [
      { id: 'cholesky-computation-type', title: 'Computation Pattern', description: 'How Cholesky factorizations are typically performed' }
    ]
  },
  {
    title: "Libraries Used/Interested",
    description: "Software libraries currently used or of interest",
    questionGroups: [
      {
        title: "Libraries Used/Interested",
        questions: [
          { id: 'cholesky-nla-group-distributed-used', title: 'Distributed Dense Libraries (Used)', description: 'Currently used distributed-memory libraries' },
          { id: 'cholesky-nla-group-distributed-interested', title: 'Distributed Dense Libraries (Interested)', description: 'Distributed-memory libraries of interest' },
          { id: 'cholesky-nla-group-specialized-used', title: 'Specialized Libraries (Used)', description: 'Currently used specialized libraries for sparse/structured matrices' },
          { id: 'cholesky-nla-group-specialized-interested', title: 'Specialized Libraries (Interested)', description: 'Specialized libraries of interest' }
        ]
      }
    ]
  },
  {
    title: "Benchmarks",
    description: "Data provision, scaling requirements, and input data types",
    questionGroups: [
      {
        title: "Benchmarks",
        questions: [
          { id: 'cholesky-scaling-requirements', title: 'Scaling Requirements', description: 'Parallel scaling requirements' },
          { id: 'cholesky-input-data-type', title: 'Input Data Type for Benchmarking', description: 'Type of input data used for benchmarking' },
          { id: 'cholesky-data-provision', title: 'Possibility of Providing Data or Mini-apps', description: 'Type of data provided for benchmarking' }
        ]
      }
    ]
  }
];

export default function CholeskyFactorizationPage() {
  const [responses, setResponses] = useState<CholeskyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveyData();
  }, []);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const surveyFiles = [
        'cp2k.json', 'ntchem-1.json', 'ntchem-2.json', 'PLASMA.json', 
        'quantum-espresso.json', 'siesta-1.json'
      ];

      const loadedResponses: CholeskyResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include if cholesky-factorization is true
            if (data['cholesky-factorization'] === true) {
              // Extract use case from current-use-case field
              const useCase = data['current-use-case'] || 'General';
              
              // Create specific use case identifiers based on the actual use case
              let useCaseShort = 'General';
              if (useCase.toLowerCase().includes('ground state')) {
                useCaseShort = 'Ground States';
              } else if (useCase.toLowerCase().includes('excited state')) {
                useCaseShort = 'Excited States';
              } else if (useCase.toLowerCase().includes('transport')) {
                useCaseShort = 'Transport';
              } else if (useCase.toLowerCase().includes('bse')) {
                useCaseShort = 'BSE';
              } else if (useCase.toLowerCase().includes('gw')) {
                useCaseShort = 'GW';
              } else {
                // Fallback to generic abbreviation
                useCaseShort = useCase
                  .replace(/calculations?/gi, 'calc')
                  .replace(/simulation/gi, 'sim')
                  .replace(/ground state/gi, 'Ground States')
                  .replace(/excited state/gi, 'Excited States')
                  .replace(/transport/gi, 'Transport')
                  .replace(/BSE solver/gi, 'BSE')
                  .replace(/GW simulation/gi, 'GW')
                  .substring(0, 20);
              }
              
              const applicationName = data['library-name'] || 'undefined';
              
              // Only DFTB+ gets use case suffixes in the display name (following the pattern)
              let displayName = applicationName;
              if (applicationName === 'DFTB+') {
                if (useCaseShort === 'Ground States') {
                  displayName = 'DFTB+ (TB)';
                } else if (useCaseShort === 'Excited States') {
                  displayName = 'DFTB+ (Casida)';
                }
              }
              
              loadedResponses.push({
                application: displayName,
                useCase: useCaseShort,
                displayName: displayName,
                responses: data
              });
            }
          }
        } catch (err) {
          console.warn(`Failed to load ${file}:`, err);
        }
      }

      setResponses(loadedResponses);
    } catch (err) {
      setError('Failed to load survey data');
      console.error('Error loading survey data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Cholesky Factorization analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cholesky Factorization of Overlap Matrix B
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of Cholesky factorization for reducing generalized symmetric eigenproblems to standard form 
            across {responses.length} applications
          </p>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Applications Using Cholesky Factorization</h2>
            <p className="text-gray-600">Applications that reported using Cholesky factorization</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {responses.map((response, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{response.application}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Question Analysis by Category */}
        <div className="space-y-12">
          {choleskyQuestionCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  {category.questions ? category.questions.length : (category.questionGroups ? category.questionGroups.reduce((total, group) => total + group.questions.length, 0) : 0)} questions in this category
                </div>
              </div>

              {/* Questions in this category */}
              <div className="space-y-6">
                {/* Regular questions */}
                {category.questions && category.questions.map((question) => (
                  <div key={question.id} className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900">{question.title}</h3>
                      <p className="text-gray-600">{question.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Application
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Response
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {responses.map((response, responseIndex) => {
                              const value = response.responses[question.id];
                              const formattedValue = formatValueWithOther(question.id, value, response.responses);
                              
                              return (
                                <tr key={responseIndex} className={responseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {response.application}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    <div className="max-w-md">
                                      {formattedValue}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Question groups (for merged tables) */}
                {category.questionGroups && category.questionGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900">{group.title}</h3>
                      <p className="text-gray-600">Combined view of related questions</p>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Application
                              </th>
                              {group.questions.map((question) => (
                                <th key={question.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {question.title}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {responses.map((response, responseIndex) => (
                              <tr key={responseIndex} className={responseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                  {response.application}
                                </td>
                                {group.questions.map((question) => {
                                  const value = response.responses[question.id];
                                  const formattedValue = formatValueWithOther(question.id, value, response.responses);
                                  
                                  return (
                                    <td key={question.id} className="px-4 py-3 text-sm text-gray-900">
                                      <div className="max-w-xs">
                                        {formattedValue}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
