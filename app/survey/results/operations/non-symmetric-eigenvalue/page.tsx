'use client';

import { useState, useEffect } from 'react';

interface NonSymmetricEigenvalueResponse {
  application: string;
  useCase: string;
  displayName: string;
  responses: {
    [key: string]: string | string[] | boolean | undefined;
  };
}

// formatValue and formatValueWithOther functions will be used when data becomes available

// Categorized questions for Non-Symmetric Eigenvalue Problems
const nonSymmetricQuestionCategories = [
  {
    title: "Physical Applications",
    description: "Physical problems and applications involving non-Hermitian matrices",
    questions: [
      { id: 'non-sym-physical-applications', title: 'Physical Problems and Applications', description: 'Physical problems involving non-Hermitian matrices' }
    ]
  },
  {
    title: "Matrix Properties",
    description: "Structural and mathematical properties of non-symmetric matrices",
    questions: [
      { id: 'non-sym-matrix-structure', title: 'Matrix Structure', description: 'Structure of non-symmetric matrices' },
      { id: 'non-sym-matrix-distribution', title: 'Matrix Distribution', description: 'How matrices are distributed across processes/nodes' },
      { id: 'non-sym-matrix-format', title: 'Matrix Storage Format', description: 'Storage formats used for matrices' },
      { id: 'non-sym-matrix-size', title: 'Matrix Dimensions', description: 'Typical matrix dimensions' },
      { id: 'non-sym-matrix-condition', title: 'Matrix Conditioning', description: 'Conditioning properties of matrices' }
    ]
  },
  {
    title: "Eigenvalue Computation",
    description: "What eigenvalues/eigenvectors to compute and their properties",
    questions: [
      { id: 'non-sym-compute-mode', title: 'What to Compute', description: 'What needs to be computed (eigenvalues, eigenvectors, both)' },
      { id: 'non-sym-eigenvalue-location', title: 'Eigenvalue Location', description: 'Which eigenvalues are of interest' },
      { id: 'non-sym-eigenvalue-percentage', title: 'Eigenvalue Percentage', description: 'Percentage of eigenvalues needed' },
      { id: 'non-sym-eigenvalue-distribution', title: 'Eigenvalue Distribution', description: 'Distribution pattern of eigenvalues' }
    ]
  },
  {
    title: "Numerical Methods",
    description: "Mathematical approaches and algorithms for non-symmetric problems",
    questions: [
      { id: 'non-sym-algorithm-type', title: 'Algorithm Type', description: 'Type of algorithm used for eigenvalue computation' },
      { id: 'non-sym-preconditioning', title: 'Preconditioning', description: 'Preconditioning strategies used' },
      { id: 'non-sym-precision-type', title: 'Working Precision', description: 'Numerical precision used or needed' }
    ]
  },
  {
    title: "Tolerance and Accuracy",
    description: "Accuracy requirements and convergence criteria",
    questions: [
      { id: 'non-sym-residual-type', title: 'Residual Type', description: 'Type of residual used for convergence' },
      { id: 'non-sym-orthogonality-tolerance', title: 'Orthogonality Tolerance', description: 'Required orthogonality tolerance' },
      { id: 'non-sym-absolute-residual-tolerance', title: 'Absolute Residual Tolerance', description: 'Required absolute residual tolerance' },
      { id: 'non-sym-relative-residual-tolerance', title: 'Relative Residual Tolerance', description: 'Required relative residual tolerance' }
    ]
  },
  {
    title: "Libraries Used/Interested",
    description: "Software libraries currently used or of interest",
    questions: [
      { id: 'non-sym-nla-group-distributed', title: 'Distributed Dense Libraries', description: 'Distributed-memory dense linear algebra libraries used' },
      { id: 'non-sym-nla-group-iterative', title: 'Iterative Methods', description: 'Iterative methods used for eigenvalue problems' },
      { id: 'non-sym-nla-group-highlevel', title: 'High-Level Libraries', description: 'High-level libraries and interfaces used' },
      { id: 'non-sym-interested-libraries', title: 'Interested Libraries', description: 'Libraries of interest for non-symmetric problems' }
    ]
  },
  {
    title: "Benchmarks",
    description: "Data provision, scaling requirements, and input data types",
    questions: [
      { id: 'non-sym-scaling-requirements', title: 'Scaling Requirements', description: 'Parallel scaling requirements' },
      { id: 'non-sym-input-data-type', title: 'Input Data Type for Benchmarking', description: 'Type of input data used for benchmarking' },
      { id: 'non-sym-data-provision', title: 'Possibility of Providing Data or Mini-apps', description: 'Type of data provided for benchmarking' }
    ]
  }
];

export default function NonSymmetricEigenvaluePage() {
  const [responses, setResponses] = useState<NonSymmetricEigenvalueResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveyData();
  }, []);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      // Check all survey files for non-symmetric eigenvalue usage
      const surveyFiles = [
        'CASTEP.json', 'cp2k.json', 'DFTB+-1.json', 'DFTB+-2.json', 
        'FHI-AIMS.json', 'Ginkgo.json', 'LAPACK.json', 'libngef.json',
        'ntchem-1.json', 'ntchem-2.json', 'PLASMA.json', 'principleModes.json', 
        'quantum-espresso.json', 'siesta-1.json', 'siesta-2.json', 'yambo-1.json', 'yambo-2.json'
      ];

      const loadedResponses: NonSymmetricEigenvalueResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            // Only include if non-symmetric-eigenvalue is true
            if (data['non-symmetric-eigenvalue'] === true) {
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
          <p className="mt-4 text-gray-600">Loading Non-Symmetric Eigenvalue Problems analysis...</p>
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
            Non-Symmetric/Non-Hermitian Eigenvalue Problems
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of non-symmetric eigenvalue problems 
            across {responses.length} application{responses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Applications Using Non-Symmetric Eigenvalue Problems</h2>
            <p className="text-gray-600">Applications that reported using non-symmetric eigenvalue problems</p>
          </div>
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No applications in the current survey data reported using non-symmetric eigenvalue problems. 
              This page will automatically populate when applications start using this operation.
            </p>
          </div>
        </div>

        {/* Question Categories Preview (Empty) */}
        <div className="space-y-12">
          {nonSymmetricQuestionCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{category.title}</h2>
                <p className="text-gray-500">{category.description}</p>
                <div className="mt-2 text-sm text-gray-500 font-medium">
                  {category.questions.length} questions in this category
                </div>
              </div>

              {/* Empty Questions Placeholder */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-500">Questions will appear here when data is available</h3>
                  <p className="text-gray-400">This section will show detailed question analysis once applications start using non-symmetric eigenvalue problems</p>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="text-gray-300 text-4xl mb-2">📊</div>
                    <p className="text-gray-500">No data available yet</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
