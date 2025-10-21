'use client';

import { useState, useEffect } from 'react';

interface BseResponse {
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

// Categorized questions for Quasi-Hermitian (BSE) Eigenvalue Problems
const bseQuestionCategories = [
  {
    title: "Problem Characteristics",
    description: "Basic properties and scale of BSE eigenvalue problems",
    questions: [
      { id: 'bse-scale-size', title: 'Problem Scale Size', description: 'Typical size of BSE eigenvalue problems' },
      { id: 'bse-matrix-structure', title: 'Matrix Structure', description: 'Structure and properties of BSE matrices' }
    ]
  },
  {
    title: "Matrix Properties",
    description: "Detailed matrix characteristics and storage formats",
    questionGroups: [
      {
        title: "Distribution & Storage",
        questions: [
          { id: 'bse-matrix-distribution', title: 'Matrix Distribution', description: 'How matrices are distributed across processes/nodes' },
          { id: 'bse-matrix-format', title: 'Matrix Storage Format', description: 'Storage formats used for matrices' }
        ]
      },
      {
        title: "Mathematical Properties",
        questions: [
          { id: 'bse-eigenvalue-distribution', title: 'Eigenvalue Distribution', description: 'How eigenvalues are typically distributed' }
        ]
      }
    ]
  },
  {
    title: "Computation Requirements",
    description: "What needs to be computed and eigenvalue specifications",
    questions: [
      { id: 'bse-compute-mode', title: 'What to Compute', description: 'What needs to be computed (eigenvalues, eigenvectors, both)' },
      { id: 'bse-eigenvalue-location', title: 'Eigenvalue Location', description: 'Which eigenvalues are most important' },
      { id: 'bse-eigenvalue-percentage', title: 'Eigenvalue Percentage', description: 'Percentage of eigenvalues typically computed' }
    ]
  },
  {
    title: "Tolerance",
    description: "Accuracy requirements and convergence criteria",
    questions: [
      { id: 'bse-residual-type', title: 'Residual Type', description: 'Type of residual used for convergence' },
      { id: 'bse-absolute-residual-tolerance', title: 'Absolute Residual Tolerance', description: 'Required absolute residual tolerance' },
      { id: 'bse-relative-residual-tolerance', title: 'Relative Residual Tolerance', description: 'Required relative residual tolerance' },
      { id: 'bse-hybrid-residual-tolerance', title: 'Hybrid Residual Tolerance', description: 'Hybrid residual tolerance criteria' },
      { id: 'bse-orthogonality-tolerance', title: 'Orthogonality Tolerance', description: 'Required orthogonality tolerance for eigenvectors' },
      { id: 'bse-precision-type', title: 'Precision Type', description: 'Numerical precision used or needed' }
    ]
  },
  {
    title: "Computation Patterns",
    description: "Workload patterns and computation characteristics",
    questions: [
      { id: 'bse-computation-type', title: 'Computation Pattern', description: 'Pattern of computation (capability vs capacity)' }
    ]
  },
  {
    title: "Libraries Used/Interested",
    description: "Software libraries and methods currently used or of interest",
    questionGroups: [
      {
        title: "General Non-Hermitian Libraries",
        questions: [
          { id: 'bse-nla-general-nonhermitian', title: 'General Non-Hermitian Libraries', description: 'General non-Hermitian eigenvalue libraries used' }
        ]
      },
      {
        title: "BSE-Specific Libraries",
        questions: [
          { id: 'bse-nla-bse-specific', title: 'BSE-Specific Libraries', description: 'BSE-specific libraries and methods used' }
        ]
      },
      {
        title: "Other Libraries",
        questions: [
          { id: 'bse-nla-group-distributed', title: 'Distributed Dense Libraries', description: 'Distributed-memory dense linear algebra libraries used' },
          { id: 'bse-nla-group-iterative', title: 'Iterative Methods', description: 'Iterative methods used for BSE eigenvalue problems' },
          { id: 'bse-nla-group-highlevel', title: 'High-Level Libraries', description: 'High-level libraries and interfaces used' },
          { id: 'bse-interested-libraries', title: 'Interested Libraries', description: 'Libraries of interest for BSE problems' }
        ]
      }
    ]
  },
  {
    title: "Benchmarks",
    description: "Data provision, scaling requirements, and input data types",
    questions: [
      { id: 'bse-scaling-requirements', title: 'Scaling Requirements', description: 'Parallel scaling requirements' },
      { id: 'bse-input-data-type', title: 'Input Data Type for Benchmarking', description: 'Type of input data used for benchmarking' },
      { id: 'bse-data-provision', title: 'Possibility of Providing Data or Mini-apps', description: 'Type of data provided for benchmarking' }
    ]
  }
];

export default function QuasiHermitianBsePage() {
  const [responses, setResponses] = useState<BseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveyData();
  }, []);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const surveyFiles = [
        'FHI-AIMS.json', 'ntchem-1.json', 'ntchem-2.json', 'yambo-2.json'
      ];

      const loadedResponses: BseResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include if quasi-hermitian-bse is true
            if (data['quasi-hermitian-bse'] === true) {
              // Extract use case from current-use-case field
              const useCase = data['current-use-case'] || 'General';
              
              // Create specific use case identifiers based on the actual use case
              let useCaseShort = 'General';
              if (useCase.toLowerCase().includes('bse')) {
                useCaseShort = 'BSE';
              } else if (useCase.toLowerCase().includes('gw')) {
                useCaseShort = 'GW';
              } else {
                // Fallback to generic abbreviation
                useCaseShort = useCase
                  .replace(/calculations?/gi, 'calc')
                  .replace(/simulation/gi, 'sim')
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
          <p className="mt-4 text-gray-600">Loading Quasi-Hermitian BSE analysis...</p>
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
            Quasi-Hermitian (BSE) Eigenvalue Problems (Hψ = Eψ)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of quasi-Hermitian eigenvalue problems arising from the Bethe-Salpeter Equation 
            across {responses.length} applications
          </p>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Applications Using Quasi-Hermitian (BSE) Eigenvalue Problems</h2>
            <p className="text-gray-600">Applications that reported using quasi-Hermitian eigenvalue problems from BSE</p>
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
          {bseQuestionCategories.map((category, categoryIndex) => (
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
      </div>
    </div>
  );
}
