'use client';

import { useState, useEffect } from 'react';
import { formatApplicationName } from '@/lib/surveyAnalytics';

interface GEVResponse {
  application: string;
  responses: {
    [key: string]: string | string[] | boolean | undefined;
  };
}

export default function GEVAnalysisPage() {
  const [responses, setResponses] = useState<GEVResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveyData();
  }, []);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const surveyFiles = [
        'CASTEP.json', 'cp2k.json', 'cp2k-2.json', 'cp2k-3.json', 'DFTB+-1.json', 'DFTB+-2.json', 
        'FHI-AIMS.json', 'Ginkgo.json', 'LAPACK.json', 'libngef.json',
        'ntchem-1.json', 'ntchem-2.json', 'PLASMA.json', 'principleModes.json', 
        'quantum-espresso.json', 'siesta-1.json', 'siesta-2.json', 'sirirus.json', 
        'unknown.json', 'turboRVB-1.json', 'yambo-1.json', 'yambo-2.json'
      ];

      const loadedResponses: GEVResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include responses that use GEV
            if (data['generalized-eigenvalue'] === true || data['gen-symmetric-hermitian'] === true) {
              const libraryName = data['library-name'] || 'undefined';
              const useCase = data['current-use-case'];
              const applicationName = formatApplicationName(libraryName, useCase);
              
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

  // GEV-specific questions grouped by category
  const gevQuestionCategories = [
    {
      title: "Problem Characteristics",
      description: "Basic properties and scale of GEV problems",
      questions: [
        {
          id: 'gen-sym-herm-scale-size',
          title: 'Problem Scale Size',
          description: 'Typical size of generalized eigenvalue problems'
        },
        {
          id: 'gen-sym-matrix-structure',
          title: 'Matrix Structure',
          description: 'Structure of matrices A and B in Ax = λBx'
        },
        {
          id: 'gen-sym-computation-type',
          title: 'Computation Type',
          description: 'Type of computational workload'
        }
      ]
    },
    {
      title: "Numerical Methods",
      description: "Mathematical approaches and reduction strategies",
      questions: [
        {
          id: 'gen-sym-reduction-needed',
          title: 'Reduction Required',
          description: 'Whether reduction to standard form is needed'
        },
        {
          id: 'gen-sym-reduction-method',
          title: 'Reduction Method',
          description: 'Method used to reduce generalized to standard form'
        },
        {
          id: 'gen-sym-precision-type',
          title: 'Precision Type',
          description: 'Numerical precision requirements'
        }
      ]
    },
    {
      title: "Computational Requirements",
      description: "How many eigenvalues/pairs to compute and their properties",
      questions: [
        {
          id: 'gen-sym-herm-compute-mode',
          title: 'Eigenvalue/Eigenvector Computation',
          description: 'What needs to be computed (eigenvalues, eigenvectors, both)'
        },
        {
          id: 'gen-sym-herm-eigenvalue-location',
          title: 'Eigenvalue Location',
          description: 'Which eigenvalues are of interest'
        },
        {
          id: 'gen-sym-herm-eigenvalue-percentage',
          title: 'Eigenvalue Percentage',
          description: 'Percentage of eigenvalues needed'
        },
        {
          id: 'gen-sym-herm-eigenvalue-distribution',
          title: 'Eigenvalue Distribution',
          description: 'Distribution pattern of eigenvalues'
        }
      ]
    },
    {
      title: "Tolerance",
      description: "Accuracy requirements and convergence criteria",
      questions: [
        {
          id: 'gen-sym-herm-residual-type',
          title: 'Residual Type',
          description: 'Type of residual used for convergence'
        },
        {
          id: 'gen-sym-herm-absolute-residual-tolerance',
          title: 'Absolute Residual Tolerance',
          description: 'Required absolute residual tolerance'
        },
        {
          id: 'gen-sym-herm-relative-residual-tolerance',
          title: 'Relative Residual Tolerance',
          description: 'Required relative residual tolerance'
        },
        {
          id: 'gen-sym-herm-hybrid-residual-tolerance',
          title: 'Hybrid Residual Tolerance',
          description: 'Hybrid residual tolerance criteria'
        },
        {
          id: 'gen-sym-herm-orthogonality-tolerance',
          title: 'Orthogonality Tolerance',
          description: 'Required orthogonality tolerance'
        }
      ]
    },
    {
      title: "Computation Patterns",
      description: "Workload patterns and computation characteristics",
      questions: [
        {
          id: 'gen-sym-computation-type',
          title: 'Computation Pattern',
          description: 'Pattern of computation (capability vs capacity)'
        }
      ]
    },
    {
      title: "Libraries Used/Interested",
      description: "Software libraries and methods currently used or of interest",
      questionGroups: [
        {
          title: "Distributed & Iterative Libraries",
          questions: [
            {
              id: 'gen-sym-nla-distributed-dense',
              title: 'Distributed Dense Libraries',
              description: 'Distributed dense linear algebra libraries used'
            },
            {
              id: 'gen-sym-nla-iterative',
              title: 'Iterative Methods',
              description: 'Iterative methods used for GEV problems'
            }
          ]
        },
        {
          title: "High-Level & Interested Libraries",
          questions: [
            {
              id: 'gen-sym-nla-highlevel',
              title: 'High-Level Libraries',
              description: 'High-level libraries and interfaces used'
            },
            {
              id: 'gen-sym-interested-libraries',
              title: 'Interested Libraries',
              description: 'Libraries of interest for GEV problems'
            }
          ]
        }
      ]
    },
    {
      title: "Benchmarks",
      description: "Scaling requirements, input data types, and data provision for benchmarking",
      questions: [
        {
          id: 'gen-sym-scaling-requirements',
          title: 'Scaling Requirements',
          description: 'Parallel scaling requirements'
        },
        {
          id: 'gen-sym-herm-input-data-type',
          title: 'Input Data Type for Benchmarking',
          description: 'Type of input data used for benchmarking'
        },
        {
          id: 'gen-sym-herm-data-provision',
          title: 'Possibility of Providing Data or Mini-apps',
          description: 'Type of data provided for benchmarking (matrices, mini-apps, etc.)'
        }
      ]
    }
  ];

  // Note: We now use the categorized structure directly instead of flattening

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading GEV analysis...</p>
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
            Generalized Eigenvalue Problems (Ax = λBx)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of generalized eigenvalue problem requirements and implementations 
            across {responses.length} applications
          </p>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Applications Using GEV</h2>
            <p className="text-gray-600">Applications that reported using generalized eigenvalue problems</p>
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
          {gevQuestionCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  {category.questionGroups ? 
                    category.questionGroups.reduce((total, group) => total + group.questions.length, 0) : 
                    category.questions.length} questions in this category
                </div>
              </div>

              {/* Handle question groups (merged tables) */}
              {category.questionGroups ? (
                <div className="space-y-6">
                  {category.questionGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="bg-white rounded-lg shadow">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">{group.title}</h3>
                      </div>
                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Application
                                </th>
                                {group.questions.map((question, qIndex) => (
                                  <th key={qIndex} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                  {group.questions.map((question, qIndex) => (
                                    <td key={qIndex} className="px-4 py-3 text-sm text-gray-900">
                                      <div className="max-w-xs">
                                        {formatValueWithOther(question.id, response.responses[question.id], response.responses)}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Handle single questions (merged into one table) */
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Application
                            </th>
                            {category.questions.map((question, qIndex) => (
                              <th key={qIndex} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                              {category.questions.map((question, qIndex) => (
                                <td key={qIndex} className="px-4 py-3 text-sm text-gray-900">
                                  <div className="max-w-xs">
                                    {formatValueWithOther(question.id, response.responses[question.id], response.responses)}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <a 
            href="/survey/results"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Results Overview
          </a>
          <a 
            href="/survey/results/operations"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Operations →
          </a>
        </div>
      </div>
    </div>
  );
}
