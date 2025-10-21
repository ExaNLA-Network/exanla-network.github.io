'use client';

import { useState, useEffect } from 'react';
import { SurveyResponse } from '@/lib/surveyAnalytics';

interface OperationInfo {
  id: string;
  name: string;
  description: string;
  usageCount: number;
  applications: string[];
  color: string;
  icon: string;
}

export default function OperationsOverviewPage() {
  const [operations, setOperations] = useState<OperationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveyData();
  }, []);

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

      const loadedResponses: SurveyResponse[] = [];
      
      for (const file of surveyFiles) {
        try {
          const response = await fetch(`/survey/nla-in-applications/${file}`);
          if (response.ok) {
            const data = await response.json();
            loadedResponses.push(data);
          }
        } catch (err) {
          console.warn(`Failed to load ${file}:`, err);
        }
      }

      // Analyze operations - only include ones with dedicated pages
      const operationDefinitions: OperationInfo[] = [
        {
          id: 'matrix-multiplication',
          name: 'Matrix Multiplication',
          description: 'General matrix-matrix multiplication (GEMM) operations',
          usageCount: 0,
          applications: [],
          color: 'blue',
          icon: '×'
        },
        {
          id: 'symmetric-hermitian',
          name: 'Standard Symmetric/Hermitian Eigenvalue Problems',
          description: 'Standard eigenvalue problems (Ax = λx) with symmetric/Hermitian matrices',
          usageCount: 0,
          applications: [],
          color: 'green',
          icon: 'λ'
        },
        {
          id: 'quasi-hermitian-bse',
          name: 'Quasi-Hermitian (BSE) Eigenvalue Problems',
          description: 'Quasi-Hermitian eigenvalue problems from Bethe-Salpeter Equation (Hψ = Eψ)',
          usageCount: 0,
          applications: [],
          color: 'orange',
          icon: 'ψ'
        },
        {
          id: 'cholesky-factorization',
          name: 'Cholesky Factorization',
          description: 'Cholesky factorization of overlap matrix B for generalized eigenproblems',
          usageCount: 0,
          applications: [],
          color: 'red',
          icon: 'L'
        },
        {
          id: 'matrix-inversion',
          name: 'Matrix Inversion',
          description: 'Matrix inversion operations (A⁻¹) including direct and implicit methods',
          usageCount: 0,
          applications: [],
          color: 'yellow',
          icon: 'A⁻¹'
        },
        {
          id: 'qr-factorization',
          name: 'QR Factorization',
          description: 'QR factorization operations (A = QR) for least squares and orthogonalization',
          usageCount: 0,
          applications: [],
          color: 'teal',
          icon: 'QR'
        },
        {
          id: 'linear-system-solvers',
          name: 'Linear System Solvers',
          description: 'Linear system solvers for Ax = b problems including direct and iterative methods',
          usageCount: 0,
          applications: [],
          color: 'indigo',
          icon: 'Ax=b'
        },
        {
          id: 'gev',
          name: 'Generalized Eigenvalue Problems',
          description: 'Generalized eigenvalue problems (Ax = λBx)',
          usageCount: 0,
          applications: [],
          color: 'purple',
          icon: 'λB'
        },
        {
          id: 'polynomial-filtering',
          name: 'Polynomial Filtering and Matrix Functions',
          description: 'Polynomial filtering and matrix function evaluations p(A)',
          usageCount: 0,
          applications: [],
          color: 'pink',
          icon: 'p(A)'
        },
        {
          id: 'non-symmetric-eigenvalue',
          name: 'Non-Symmetric Eigenvalue Problems',
          description: 'Non-symmetric/non-Hermitian eigenvalue problems (Ax = λx)',
          usageCount: 0,
          applications: [],
          color: 'gray',
          icon: 'λ'
        }
      ];

      // Count usage for each operation
      operationDefinitions.forEach(op => {
        loadedResponses.forEach(response => {
          if (op.id === 'symmetric-hermitian') {
            // Special case for symmetric-hermitian which is a sub-operation of standard-eigenvalue
            if (response['symmetric-hermitian'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'quasi-hermitian-bse') {
            // Special case for quasi-hermitian-bse which is a sub-operation of standard-eigenvalue
            if (response['quasi-hermitian-bse'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'cholesky-factorization') {
            // Special case for cholesky-factorization
            if (response['cholesky-factorization'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'matrix-inversion') {
            // Special case for matrix-inversion
            if (response['matrix-inversion'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'qr-factorization') {
            // Special case for qr-factorization
            if (response['qr-factorization'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'linear-system-solvers') {
            // Special case for linear-system-solvers
            if (response['linear-system-solvers'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'non-symmetric-eigenvalue') {
            // Special case for non-symmetric-eigenvalue
            if (response['non-symmetric-eigenvalue'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'gev') {
            // Special case for GEV - check both generalized-eigenvalue and gen-symmetric-hermitian
            if (response['generalized-eigenvalue'] === true || response['gen-symmetric-hermitian'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (op.id === 'polynomial-filtering') {
            // Special case for polynomial-filtering
            if (response['polynomial-filtering'] === true) {
              op.usageCount++;
              if (!op.applications.includes(response['library-name'])) {
                op.applications.push(response['library-name']);
              }
            }
          } else if (response[op.id as keyof SurveyResponse] === true) {
            op.usageCount++;
            if (!op.applications.includes(response['library-name'])) {
              op.applications.push(response['library-name']);
            }
          }
        });
      });

      // Show all operations, even with zero usage
      setOperations(operationDefinitions);
    } catch (err) {
      setError('Failed to load survey data');
      console.error('Error loading survey data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string, usageCount: number) => {
    if (usageCount === 0) {
      return 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200 opacity-60';
    }
    
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading operations overview...</p>
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
            NLA Operations Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of each Numerical Linear Algebra operation used across applications. 
            Click on any operation to see comprehensive details and responses.
          </p>
        </div>

        {/* Operations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {operations.map((operation) => (
            <a
              key={operation.id}
              href={`/survey/results/operations/${operation.id}`}
              className={`block p-6 rounded-lg border-2 transition-all duration-200 ${getColorClasses(operation.color, operation.usageCount)}`}
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl font-bold mr-3">{operation.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{operation.name}</h3>
                  <p className="text-sm opacity-75">{operation.usageCount} applications</p>
                </div>
              </div>
              <p className="text-sm mb-4">{operation.description}</p>
              <div className="text-xs">
                <div className="font-medium mb-1">Used by:</div>
                <div className="flex flex-wrap gap-1">
                  {operation.applications.map(app => (
                    <span key={app} className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </a>
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
            href="/survey/results/insights"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Detailed Insights →
          </a>
        </div>
      </div>
    </div>
  );
}
