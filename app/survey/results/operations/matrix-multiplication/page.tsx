'use client';

import { useState, useEffect } from 'react';

interface MatrixMultResponse {
  application: string;
  responses: {
    [key: string]: string | string[] | boolean | undefined;
  };
}

const MatrixMultQuestionCategories = [
  {
    title: "Matrix Properties",
    description: "Size, shape, format, and structural properties of matrices",
    questions: [
      { id: 'gemm-matrix-size', title: 'Matrix Size Range', description: 'Typical maximum matrix dimensions (largest dimension across m, n, k)' },
      { id: 'gemm-matrix-shape', title: 'Typical Matrix Shapes', description: 'Shapes of matrices in multiplication operations' },
      { id: 'gemm-matrix-format', title: 'Matrix Format', description: 'Storage format for matrices' },
      { id: 'gemm-matrix-structure', title: 'Matrix Structure', description: 'Structural properties of matrices' },
      { id: 'gemm-matrix-distribution', title: 'Matrix Distribution', description: 'How matrices are distributed across processes' }
    ]
  },
  {
    title: "Operation Types",
    description: "Types of matrix multiplication operations performed",
    questions: [
      { id: 'gemm-operation-types', title: 'Operation Types', description: 'Types of matrix multiplication operations' },
      { id: 'gemm-computation-pattern', title: 'Computation Pattern', description: 'Pattern of computation (capability vs capacity)' }
    ]
  },
  {
    title: "Performance Requirements",
    description: "Performance characteristics and requirements",
    questions: [
      { id: 'gemm-performance-requirements', title: 'Performance Requirements', description: 'Performance requirements for matrix multiplication' },
      { id: 'gemm-scaling-requirements', title: 'Scaling Requirements', description: 'Parallel scaling requirements' }
    ]
  },
  {
    title: "Libraries Used/Interested",
    description: "Software libraries currently used or of interest",
    questions: [
      { id: 'gemm-libraries-distributed', title: 'Distributed Libraries', description: 'Distributed memory libraries used' },
      { id: 'gemm-interested-libraries', title: 'Libraries of Interest', description: 'Libraries of interest for matrix multiplication' }
    ]
  },
  {
    title: "Hardware and Precision",
    description: "Hardware platforms and numerical precision requirements",
    questions: [
      { id: 'gemm-precision-type', title: 'Precision Types', description: 'Numerical precision types used' },
      { id: 'gemm-batch-size', title: 'Batch Size', description: 'Typical batch sizes for matrix operations' }
    ]
  },
  {
    title: "Specialized Implementations",
    description: "Advanced and specialized matrix multiplication implementations",
    questions: [
      { id: 'gemm-special-implementations', title: 'Special/Advanced Implementations', description: 'Special or advanced matrix multiplication implementations used' }
    ]
  },
  {
    title: "Future Requirements",
    description: "Desired features and future development needs",
    questions: [
      { id: 'gemm-future-features', title: 'Desired Features', description: 'Features that would be useful for applications' }
    ]
  },
  {
    title: "Benchmarks",
    description: "Data provision, scaling requirements, and input data types",
    questions: [
      { id: 'gemm-input-data-type', title: 'Input Data Type for Benchmarking', description: 'Type of input data used for benchmarking' },
      { id: 'gemm-data-provision', title: 'Possibility of Providing Data or Mini-apps', description: 'Type of data provided for benchmarking' }
    ]
  }
];

export default function MatrixMultiplicationPage() {
  const [responses, setResponses] = useState<MatrixMultResponse[]>([]);
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
        'FHI-AIMS.json', 'Ginkgo.json', 'LAPACK.json', 'libngef.json',
        'ntchem-1.json', 'ntchem-2.json', 'PLASMA.json', 'principleModes.json', 
        'quantum-espresso.json', 'siesta-1.json', 'siesta-2.json', 'unknown.json', 
        'yambo-1.json', 'yambo-2.json'
      ];

      const loadedResponses: MatrixMultResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include if matrix-multiplication is true
            if (data['matrix-multiplication'] === true) {
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
            <p className="mt-4 text-gray-600">Loading matrix multiplication data...</p>
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
            Matrix Multiplication Operations
          </h1>
          <p className="text-lg text-gray-600">
            Analysis of matrix-matrix multiplication (GEMM) operations in scientific applications
          </p>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Applications Using Matrix Multiplication</h2>
            <p className="text-gray-600">Applications that reported using matrix multiplication operations</p>
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

        {/* Detailed Analysis by Category */}
        {responses.length > 0 && (
          <div className="space-y-8">
            {MatrixMultQuestionCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
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
                          {category.questions.map((question, qIndex) => {
                            const value = response.responses[question.id];
                            const formattedValue = formatValueWithOther(question.id, value, response.responses);
                            return (
                              <td key={qIndex} className="px-4 py-3 text-sm text-gray-900">
                                <div className="max-w-md">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}