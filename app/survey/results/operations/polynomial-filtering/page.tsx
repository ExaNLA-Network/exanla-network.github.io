'use client';

import { useState, useEffect } from 'react';

interface PolyFilterResponse {
  application: string;
  responses: {
    [key: string]: string | string[] | boolean | undefined;
  };
}

const PolyFilterQuestionCategories = [
  {
    title: "Application Purpose",
    description: "Primary use cases and applications of polynomial filtering",
    questions: [
      { id: 'poly-primary-use', title: 'Primary Use Cases', description: 'Main uses for polynomial filtering' }
    ]
  },
  {
    title: "Matrix Context",
    description: "Matrix types, distribution, and storage formats",
    questionGroups: [
      {
        title: "Matrix Context",
        questions: [
          { id: 'poly-matrix-type', title: 'Matrix Type', description: 'Type of matrices for polynomial functions' },
          { id: 'poly-matrix-distribution', title: 'Matrix Distribution', description: 'How matrices are distributed across processes' },
          { id: 'poly-matrix-format', title: 'Matrix Storage Format', description: 'Storage formats used for matrices' }
        ]
      }
    ]
  },
  {
    title: "Polynomial Types",
    description: "Polynomial bases and degree requirements",
    questionGroups: [
      {
        title: "Polynomial Types",
        questions: [
          { id: 'poly-basis-type', title: 'Polynomial Basis', description: 'Which polynomial bases are used' },
          { id: 'poly-degree', title: 'Polynomial Degree', description: 'Typical polynomial degree requirements' }
        ]
      }
    ]
  },
  {
    title: "Accuracy and Convergence",
    description: "Accuracy requirements and convergence criteria",
    questionGroups: [
      {
        title: "Accuracy and Convergence",
        questions: [
          { id: 'poly-accuracy-requirements', title: 'Accuracy Requirements', description: 'Required accuracy levels' },
          { id: 'poly-convergence-criteria', title: 'Convergence Criteria', description: 'Criteria used for convergence' },
          { id: 'poly-precision-type', title: 'Working Precision', description: 'Numerical precision requirements' }
        ]
      }
    ]
  },
  {
    title: "Workload Characteristics",
    description: "Computation patterns and resource requirements",
    questions: [
      { id: 'poly-computation-type', title: 'Computation Pattern', description: 'How polynomial filtering operations are performed' }
    ]
  },
  {
    title: "Libraries Used/Interested",
    description: "Software libraries currently used or of interest",
    questionGroups: [
      {
        title: "Libraries Used/Interested",
        questions: [
          { id: 'poly-libraries-current', title: 'Currently Used Libraries', description: 'Libraries currently used for polynomial filtering' },
          { id: 'poly-libraries-interested', title: 'Libraries of Interest', description: 'Libraries of interest for polynomial filtering' }
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
          { id: 'poly-input-data-type', title: 'Benchmark Input Types', description: 'Types of matrix inputs for benchmarking' },
          { id: 'poly-data-provision', title: 'Data Provision', description: 'Ability to provide data or mini-apps' },
          { id: 'poly-scaling-requirements', title: 'Scaling Requirements', description: 'Parallel scaling requirements' }
        ]
      }
    ]
  }
];

export default function PolynomialFilteringPage() {
  const [responses, setResponses] = useState<PolyFilterResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const surveyFiles = [
        'CASTEP.json', 'cp2k.json', 'DFTB+-1.json', 'DFTB+-2.json', 
        'FHI-AIMS.json', 'PLASMA.json', 'yambo-2.json', 'unknown.json',
        'ntchem-1.json', 'ntchem-2.json'
      ];

      const loadedResponses: PolyFilterResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include if polynomial-filtering is true
            if (data['polynomial-filtering'] === true) {
              const applicationName = data['library-name'] || 'undefined';
              
              loadedResponses.push({
                application: applicationName,
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

  useEffect(() => {
    loadSurveyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading polynomial filtering data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button 
              onClick={loadSurveyData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Polynomial Filtering and Matrix Functions
          </h1>
          <p className="text-lg text-gray-600">
            Analysis of polynomial filtering operations in scientific applications
          </p>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Applications Using Polynomial Filtering</h2>
          </div>
          <div className="p-6">
            {responses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {responses.map((response, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900">{response.application}</h3>
                    <p className="text-sm text-blue-700 mt-1">Polynomial filtering operations</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No applications currently use polynomial filtering operations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Analysis by Category */}
        {responses.length > 0 && (
          <div className="space-y-8">
            {PolyFilterQuestionCategories.map((category, categoryIndex) => (
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
        )}
      </div>
    </div>
  );
}
