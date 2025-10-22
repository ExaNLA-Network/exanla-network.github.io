'use client';

import { useState, useEffect } from 'react';
import { SurveyResponse, SurveyAnalytics, analyzeSurveyData } from '@/lib/surveyAnalytics';

export default function SurveyResultsPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [analytics, setAnalytics] = useState<SurveyAnalytics | null>(null);
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
        'PLASMA.json', 'principleModes.json', 'quantum-espresso.json',
        'siesta-1.json', 'siesta-2.json', 'unknown.json', 'yambo-1.json', 'yambo-2.json',
        'ntchem-1.json', 'ntchem-2.json'
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

      setResponses(loadedResponses);
      setAnalytics(analyzeSurveyData(loadedResponses));
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
          <p className="mt-4 text-gray-600">Loading survey results...</p>
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

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No survey data available</p>
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
            ExaNLA Survey Results
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of Numerical Linear Algebra operations and requirements 
            across the ExaNLA community
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.totalResponses}</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{Object.keys(analytics.domainDistribution).length}</div>
            <div className="text-gray-600">Research Domains</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Object.values(analytics.operationPopularity).filter(count => count > 0).length}
            </div>
            <div className="text-gray-600">NLA Operations</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow mb-8 border border-blue-200">
          <div className="px-6 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Survey Scope</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>{analytics.totalResponses} applications</strong> from <strong>{Object.keys(analytics.domainDistribution).length} research domains</strong> 
                    reported their NLA requirements, representing a comprehensive view of computational science needs.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Key Finding</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>Matrix Multiplication</strong> is the most critical operation, used by <strong>{analytics.operationPopularity['matrix-multiplication'] || 0} applications</strong>, 
                    followed by eigenvalue problems which are essential for quantum simulations and materials science.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🔬 Domain Diversity</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Applications span across <strong>{Object.keys(analytics.domainDistribution).length} research domains</strong>, 
                    demonstrating the universal importance of NLA operations. This includes traditional scientific computing domains 
                    as well as emerging areas like <strong>Statistics</strong> (Genome-Wide Association Studies, Chemometrics).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(analytics.domainDistribution)
                      .sort(([,a], [,b]) => b - a)
                      .map(([domain, count]) => (
                        <span key={domain} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {domain} ({count})
                        </span>
                      ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ Performance Focus</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>Double precision</strong> dominates, but <strong>mixed precision</strong> and <strong>GPU acceleration</strong> 
                    are increasingly important for performance optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Distribution */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Application Distribution</h2>
            <p className="text-gray-600">Survey responses by application</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analytics.libraryDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([library, count]) => (
                  <div key={library} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{library}</span>
                    <span className="text-lg font-bold text-green-600">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* NLA Operations Analysis */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">NLA Operations Analysis</h2>
            <p className="text-gray-600">Detailed analysis of each Numerical Linear Algebra operation used across applications.</p>
            <p className="mt-2">
              <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">🔍 Click on any operation to see comprehensive details and responses.</span>
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                // Define operations with their details
                const operationDefinitions = [
                  {
                    id: 'matrix-multiplication',
                    name: 'Matrix Multiplication',
                    description: 'General matrix-matrix multiplication (GEMM) operations',
                    usageCount: analytics.operationPopularity['matrix-multiplication'] || 0,
                    applications: responses.filter(r => r['matrix-multiplication'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'blue',
                    icon: '×'
                  },
                  {
                    id: 'symmetric-hermitian',
                    name: 'Standard Symmetric/Hermitian Eigenvalue Problems',
                    description: 'Standard eigenvalue problems (Ax = λx) with symmetric/Hermitian matrices',
                    usageCount: analytics.operationPopularity['symmetric-hermitian'] || 0,
                    applications: responses.filter(r => r['symmetric-hermitian'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'green',
                    icon: 'λ'
                  },
                  {
                    id: 'quasi-hermitian-bse',
                    name: 'Quasi-Hermitian (BSE) Eigenvalue Problems',
                    description: 'Quasi-Hermitian eigenvalue problems from Bethe-Salpeter Equation (Hψ = Eψ)',
                    usageCount: analytics.operationPopularity['quasi-hermitian-bse'] || 0,
                    applications: responses.filter(r => r['quasi-hermitian-bse'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'orange',
                    icon: 'ψ'
                  },
                  {
                    id: 'cholesky-factorization',
                    name: 'Cholesky Factorization',
                    description: 'Cholesky factorization of overlap matrix B for generalized eigenproblems',
                    usageCount: analytics.operationPopularity['cholesky-factorization'] || 0,
                    applications: responses.filter(r => r['cholesky-factorization'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'red',
                    icon: 'L'
                  },
                  {
                    id: 'matrix-inversion',
                    name: 'Matrix Inversion',
                    description: 'Matrix inversion operations (A⁻¹) including direct and implicit methods',
                    usageCount: analytics.operationPopularity['matrix-inversion'] || 0,
                    applications: responses.filter(r => r['matrix-inversion'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'yellow',
                    icon: 'A⁻¹'
                  },
                  {
                    id: 'qr-factorization',
                    name: 'QR Factorization',
                    description: 'QR factorization operations (A = QR) for least squares and orthogonalization',
                    usageCount: analytics.operationPopularity['qr-factorization'] || 0,
                    applications: responses.filter(r => r['qr-factorization'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'teal',
                    icon: 'QR'
                  },
                  {
                    id: 'linear-system-solvers',
                    name: 'Linear System Solvers',
                    description: 'Linear system solvers for Ax = b problems including direct and iterative methods',
                    usageCount: analytics.operationPopularity['linear-system-solvers'] || 0,
                    applications: responses.filter(r => r['linear-system-solvers'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'indigo',
                    icon: 'Ax=b'
                  },
                  {
                    id: 'gev',
                    name: 'Generalized Eigenvalue Problems',
                    description: 'Generalized eigenvalue problems (Ax = λBx)',
                    usageCount: responses.filter(r => r['generalized-eigenvalue'] === true || r['gen-symmetric-hermitian'] === true).length,
                    applications: responses.filter(r => r['generalized-eigenvalue'] === true || r['gen-symmetric-hermitian'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'purple',
                    icon: 'λB'
                  },
                  {
                    id: 'polynomial-filtering',
                    name: 'Polynomial Filtering and Matrix Functions',
                    description: 'Polynomial filtering and matrix function evaluations p(A)',
                    usageCount: analytics.operationPopularity['polynomial-filtering'] || 0,
                    applications: responses.filter(r => r['polynomial-filtering'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'pink',
                    icon: 'p(A)'
                  },
                  {
                    id: 'non-symmetric-eigenvalue',
                    name: 'Non-Symmetric Eigenvalue Problems',
                    description: 'Non-symmetric/non-Hermitian eigenvalue problems (Ax = λx)',
                    usageCount: analytics.operationPopularity['non-symmetric-eigenvalue'] || 0,
                    applications: responses.filter(r => r['non-symmetric-eigenvalue'] === true).map(r => r['library-name'] || 'undefined'),
                    color: 'gray',
                    icon: 'λ'
                  }
                ];

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
                    teal: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200',
                    orange: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200'
                  };
                  return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
                };

                return operationDefinitions.map((operation) => (
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
                ));
              })()}
            </div>
            
            {/* Other NLA Operations */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Other NLA Operations Proposed</h3>
                  <p className="text-amber-800 text-sm mb-3">
                    The survey also identified additional NLA operations that are important but not yet covered in our current analysis. 
                    These operations represent emerging needs and specialized applications that warrant further investigation.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2">Identified Operations:</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• <strong>Least Squares</strong> - Used in Statistics (Genome-Wide Association Studies, Chemometrics)</li>
                      <li>• <strong>Generalized Least Squares</strong> - Applied in statistical modeling and data analysis</li>
                    </ul>
                    <div className="mt-3 p-3 bg-amber-100 rounded border border-amber-300">
                      <p className="text-xs text-amber-800">
                        <strong>Next Steps:</strong> These operations suggest the need for a follow-up survey focusing on statistical computing 
                        and specialized NLA operations to better understand requirements in emerging domains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operation Summaries */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Operation Insights & Patterns</h2>
            <p className="text-gray-600">Key findings and patterns from survey responses for each NLA operation</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matrix Multiplication */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Matrix Multiplication (GEMM)</h3>
                <div className="text-sm text-blue-800 space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <div className="font-semibold text-blue-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['matrix-multiplication'] || 0} applications across all domains • Most critical NLA operation</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-blue-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Sizes:</strong> Small (&lt;100) to Extreme (&gt;100K)</div>
                        <div><strong>Structures:</strong> Dense dominate, sparse, block-structured, distributed</div>
                        <div><strong>Shapes:</strong> Square, tall-skinny, wide-short, block-outer/inner product</div>
                        <div><strong>Specialized:</strong> Banded, triangular, small batched matrices</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-blue-900 mb-1">⚙️ Operations & Precision</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Common:</strong> AB, αAB+βC, αAB, AB+C, AᵀB, A†B</div>
                        <div><strong>Specialized:</strong> ABC, mixed precision, batched</div>
                        <div><strong>Precision:</strong> FP64 standard, FP32, mixed, FP16, Tensor Core</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC, block CSR/CSC</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded p-3">
                    <div className="font-semibold text-blue-900 mb-1">🏗️ Advanced Implementations</div>
                    <div className="text-xs space-y-1">
                      <div><strong>Common:</strong> Mixed-precision (FP16/FP32/FP64), hardware-specific optimizations, auto-tuning</div>
                      <div><strong>Specialized:</strong> Strassen algorithms, tensor contraction engines, fused operations (GEMM + bias/activation), block-sparse multiplication</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-blue-900 mb-1">📚 Libraries</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, SLATE, COSMA, ELPA</div>
                        <div><strong>Shared Memory:</strong> MKL, OpenBLAS</div>
                        <div><strong>GPU:</strong> cuBLASMp</div>
                        <div><strong>Distribution:</strong> Block cyclic, cyclic-cyclic, tree-based</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-blue-900 mb-1">🚀 Future Needs</div>
                      <div className="text-xs space-y-1">
                        <div>Better mixed precision support</div>
                        <div>More efficient batched operations</div>
                        <div>Improved sparse-dense multiplication</div>
                        <div>More flexible memory layouts</div>
                        <div>Better tensor contraction support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Symmetric/Hermitian Eigenvalue */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Standard Symmetric/Hermitian Eigenvalue</h3>
                <div className="text-sm text-green-800 space-y-3">
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="font-semibold text-green-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['symmetric-hermitian'] || 0} applications • Primarily DFT codes (CASTEP, DFTB+, FHI-AIMS, Yambo)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">🔬 Problem Types</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Primary:</strong> Kohn-Sham equations (standard DFT)</div>
                        <div><strong>Secondary:</strong> Tight-binding models, GW quasiparticle calculations</div>
                        <div><strong>DFTB+ Special:</strong> Ground States (TB) + Excited States (Casida)</div>
                        <div><strong>BSE:</strong> Bethe-Salpeter equation (Tamm-Dancoff approximation)</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Dense dominate, sparse, block-structured</div>
                        <div><strong>Distribution:</strong> Block cyclic (ScaLAPACK), block row/column</div>
                        <div><strong>Properties:</strong> Real/complex valued, positive definite</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">📏 Problem Sizes</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Range:</strong> Small (&lt;1K) to Very Large (100K-1M)</div>
                        <div><strong>Most Common:</strong> Large (10K-100K)</div>
                        <div><strong>Patterns:</strong> Large-scale single problems, repeated similar-sized</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling requirements</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">🎯 Eigenvalue Requirements</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Compute:</strong> Eigenvalues + eigenvectors (1-50% typically)</div>
                        <div><strong>Location:</strong> Smallest eigenvalues most important</div>
                        <div><strong>Special:</strong> Some need eigenvalues near target shifts</div>
                        <div><strong>Distribution:</strong> Various eigenvalue distributions</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">⚙️ Precision & Tolerance</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Precision:</strong> FP64 standard, some mixed precision</div>
                        <div><strong>Residual:</strong> Absolute/relative residuals (10^-6 to 10^-12)</div>
                        <div><strong>Orthogonality:</strong> Medium to high tolerance required</div>
                        <div><strong>Hybrid:</strong> Some use hybrid residual criteria</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-green-900 mb-1">📚 Libraries & Methods</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, ELPA, SLATE</div>
                        <div><strong>Shared Memory:</strong> LAPACK variants</div>
                        <div><strong>Iterative:</strong> ARPACK, SLEPc, PRIMME, ChASE</div>
                        <div><strong>High-Level:</strong> ELSI abstraction layer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generalized Eigenvalue Problems */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Generalized Eigenvalue Problems (GEV)</h3>
                <div className="text-sm text-purple-800 space-y-3">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <div className="font-semibold text-purple-900 mb-1">📊 Scale & Impact</div>
                    <div>{responses.filter(r => r['generalized-eigenvalue'] === true || r['gen-symmetric-hermitian'] === true).length} applications • Critical for DFT and quantum chemistry (DFTB+, CP2K, FHI-AIMS, SIESTA, Yambo)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">🔬 Problem Form</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Equation:</strong> Ax = λBx where B is SPD/HPD</div>
                        <div><strong>Matrix A:</strong> Hamiltonian, Fock, or similar</div>
                        <div><strong>Matrix B:</strong> Overlap matrix (SPD/HPD)</div>
                        <div><strong>Purpose:</strong> Electronic structure, quantum chemistry</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Both A and B dense most common</div>
                        <div><strong>Combinations:</strong> Sparse, block-structured combinations</div>
                        <div><strong>Values:</strong> Real/complex valued matrices</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">⚙️ Reduction Methods</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Most Common:</strong> Cholesky factorization (B = LLᵗ or L*L)</div>
                        <div><strong>Alternative:</strong> Approximate inverse of B</div>
                        <div><strong>Direct Methods:</strong> Some use direct GEV solvers</div>
                        <div><strong>Exceptions:</strong> CP2K uses direct methods; Q-E has optional KS solver iterative methods</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">📏 Problem Sizes</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Range:</strong> Medium (1K-10K) to Very Large (100K-1M)</div>
                        <div><strong>Most Common:</strong> Large (10K-100K)</div>
                        <div><strong>Patterns:</strong> Large-scale single problems, repeated similar-sized</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling requirements</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">🎯 Eigenvalue Requirements</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Compute:</strong> Eigenvalues + eigenvectors (1-50% typically)</div>
                        <div><strong>Location:</strong> Smallest eigenvalues most important</div>
                        <div><strong>Special:</strong> Some need eigenvalues near target shifts</div>
                        <div><strong>Distribution:</strong> Well-separated, clustered, scattered</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">⚙️ Precision & Tolerance</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Precision:</strong> FP64 standard, some mixed (FP32/FP64)</div>
                        <div><strong>Residual:</strong> Absolute/relative residuals (10^-6 to 10^-12)</div>
                        <div><strong>Orthogonality:</strong> Medium to high tolerance required</div>
                        <div><strong>Hybrid:</strong> Some use hybrid residual criteria</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">📚 Libraries & Methods</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, ELPA, SLATE</div>
                        <div><strong>Iterative:</strong> ARPACK, SLEPc, PRIMME, ChASE, FEAST</div>
                        <div><strong>High-Level:</strong> ELSI as abstraction layer</div>
                        <div><strong>Direct:</strong> LAPACK variants for shared memory</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-purple-900 mb-1">🔄 Computation Patterns</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Primary:</strong> Large-scale single problems</div>
                        <div><strong>Secondary:</strong> Repeated similar-sized problems</div>
                        <div><strong>Applications:</strong> Time evolution, parameter sweeps</div>
                        <div><strong>Scaling:</strong> Capability computing patterns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quasi-Hermitian BSE */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Quasi-Hermitian (BSE) Eigenvalue</h3>
                <div className="text-sm text-orange-800 space-y-3">
                  <div className="bg-orange-100 rounded-lg p-3">
                    <div className="font-semibold text-orange-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['quasi-hermitian-bse'] || 0} applications • Specialized for excited state calculations (FHI-AIMS, Yambo)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">🔬 Problem Form</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Equation:</strong> Hψ = Eψ, where H = (A B; -B* -A*)</div>
                        <div><strong>Properties:</strong> A = A† (Hermitian), B = B^T (symmetric)</div>
                        <div><strong>Purpose:</strong> Bethe-Salpeter Equation for excited states</div>
                        <div><strong>Domain:</strong> Materials science, quantum chemistry</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                        <div><strong>Values:</strong> Complex valued matrices</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">📏 Problem Sizes</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Range:</strong> Large (10K-100K) to Very Large (100K-1M)</div>
                        <div><strong>Patterns:</strong> Large-scale single problems, some batch processing</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling requirements</div>
                        <div><strong>Eigenvalue Distribution:</strong> Well-separated, clustered, scattered</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">🎯 Eigenvalue Requirements</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Compute:</strong> Selected eigenvalues + eigenvectors</div>
                        <div><strong>Location:</strong> Largest eigenvalues (top) most important</div>
                        <div><strong>Percentage:</strong> Varying percentages (1-50% typically)</div>
                        <div><strong>Purpose:</strong> Excited state calculations</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">⚙️ Precision & Tolerance</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Precision:</strong> FP64 standard, some FP32</div>
                        <div><strong>Residual:</strong> Absolute residual (||Ax - λx||) most common</div>
                        <div><strong>Orthogonality:</strong> Medium to high tolerance required</div>
                        <div><strong>Hybrid:</strong> Some use hybrid residual criteria</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-orange-900 mb-1">📚 Libraries & Methods</div>
                      <div className="text-xs space-y-1">
                        <div><strong>General Non-Hermitian:</strong> ARPACK, PRIMME, Anasazi, ScaLAPACK, SLATE</div>
                        <div><strong>BSE-Specific:</strong> BSEPACK, ChASE (extended), ELPA (experimental), SLEPc</div>
                        <div><strong>High-Level:</strong> Custom BSE implementations</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             {/* Cholesky Factorization */}
             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
               <h3 className="text-lg font-semibold text-red-900 mb-3">Cholesky Factorization</h3>
               <div className="text-sm text-red-800 space-y-3">
                 <div className="bg-red-100 rounded-lg p-3">
                   <div className="font-semibold text-red-900 mb-1">📊 Scale & Impact</div>
                   <div>{analytics.operationPopularity['cholesky-factorization'] || 0} applications • Critical for GEV reduction (DFTB+, CP2K, FHI-AIMS, SIESTA, Yambo)</div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div className="bg-white rounded p-3">
                     <div className="font-semibold text-red-900 mb-1">🔢 Matrix Properties</div>
                     <div className="text-xs space-y-1">
                       <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                       <div><strong>Conditions:</strong> Usually positive definite, varying diagonal dominance</div>
                       <div><strong>Condition Numbers:</strong> Well-conditioned to moderately conditioned</div>
                       <div><strong>Distribution:</strong> Block cyclic (ScaLAPACK), block row/column</div>
                     </div>
                   </div>
                   
                   <div className="bg-white rounded p-3">
                     <div className="font-semibold text-red-900 mb-1">📏 Problem Scale & Precision</div>
                     <div className="text-xs space-y-1">
                       <div><strong>Sizes:</strong> Medium (1K-10K) to Large (10K-100K)</div>
                       <div><strong>Precision:</strong> FP64 standard, some mixed (FP32/FP64)</div>
                       <div><strong>Tolerance:</strong> Medium to high accuracy (10^-6 to 10^-12)</div>
                       <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div className="bg-white rounded p-3">
                     <div className="font-semibold text-red-900 mb-1">📚 Libraries & Methods</div>
                     <div className="text-xs space-y-1">
                       <div><strong>Distributed:</strong> ScaLAPACK, SLATE, ELPA</div>
                       <div><strong>Shared Memory:</strong> LAPACK variants</div>
                       <div><strong>Specialized:</strong> CHOLMOD, MUMPS, PaStiX, SuperLU, PARDISO</div>
                       <div><strong>Patterns:</strong> Part of GEV reduction, iterative refinement</div>
                     </div>
                   </div>
                   
                   <div className="bg-white rounded p-3">
                     <div className="font-semibold text-red-900 mb-1">🔄 Computation Patterns</div>
                     <div className="text-xs space-y-1">
                       <div><strong>Primary:</strong> Large-scale single factorizations</div>
                       <div><strong>Secondary:</strong> Repeated factorizations during refinement</div>
                       <div><strong>Scaling:</strong> Both strong and weak scaling requirements</div>
                       <div><strong>Purpose:</strong> GEV reduction, preconditioning</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

              {/* Matrix Inversion */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Matrix Inversion</h3>
                <div className="text-sm text-yellow-800 space-y-3">
                  <div className="bg-yellow-100 rounded-lg p-3">
                    <div className="font-semibold text-yellow-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['matrix-inversion'] || 0} applications • Critical for quantum transport and DFT (CP2K, SIESTA, libNEGF)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-yellow-900 mb-1">🎯 Primary Uses</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Main:</strong> Green&apos;s function calculation (ωI-H-Σ(ω))⁻¹</div>
                        <div><strong>Additional:</strong> Linear systems (Ax = b), shift-and-invert</div>
                        <div><strong>Other:</strong> Preconditioners, basis transformation, density matrix</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-yellow-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                        <div><strong>Properties:</strong> Hermitian/symmetric, positive definite</div>
                        <div><strong>Challenges:</strong> Some indefinite, ill-conditioned matrices</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-yellow-900 mb-1">📏 Problem Scale & Precision</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Sizes:</strong> Medium (1K-10K) to Large (10K-100K)</div>
                        <div><strong>Precision:</strong> FP64 standard, some mixed/adaptive</div>
                        <div><strong>Accuracy:</strong> Medium to high (10^-6 to 10^-12)</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-yellow-900 mb-1">📚 Libraries & Patterns</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, SLATE, DPLASMA</div>
                        <div><strong>Shared Memory:</strong> LAPACK variants</div>
                        <div><strong>Patterns:</strong> Large-scale single inversions</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Factorization */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-teal-900 mb-3">QR Factorization</h3>
                <div className="text-sm text-teal-800 space-y-3">
                  <div className="bg-teal-100 rounded-lg p-3">
                    <div className="font-semibold text-teal-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['qr-factorization'] || 0} applications • Essential for least squares and orthogonalization (Quantum ESPRESSO)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-teal-900 mb-1">🎯 Primary Uses</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Main:</strong> Least squares problems, orthogonalization</div>
                        <div><strong>Additional:</strong> Basis transformation, basis set orthogonalization</div>
                        <div><strong>Applications:</strong> Quantum chemistry, DFT calculations</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-teal-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                        <div><strong>Properties:</strong> Real/complex valued, hierarchical/low-rank</div>
                        <div><strong>Shapes:</strong> Varies by application (m × n)</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-teal-900 mb-1">📏 Problem Scale & Precision</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Sizes:</strong> Medium (1K-10K) to Large (10K-100K)</div>
                        <div><strong>Precision:</strong> FP64 standard, some mixed precision</div>
                        <div><strong>Accuracy:</strong> High orthogonality (10^-9) required</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-teal-900 mb-1">📚 Libraries & Patterns</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, SLATE, DPLASMA</div>
                        <div><strong>Shared Memory:</strong> LAPACK variants</div>
                        <div><strong>Patterns:</strong> Large-scale single factorizations</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linear System Solvers */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Linear System Solvers</h3>
                <div className="text-sm text-indigo-800 space-y-3">
                  <div className="bg-indigo-100 rounded-lg p-3">
                    <div className="font-semibold text-indigo-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['linear-system-solvers'] || 0} applications • Critical for scientific computing (Yambo, libNEGF, Ginkgo, NTChem)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-indigo-900 mb-1">🎯 Primary Uses</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Main:</strong> Solving linear systems (Ax = b)</div>
                        <div><strong>Additional:</strong> Preconditioning, iterative refinement</div>
                        <div><strong>Applications:</strong> Quantum chemistry, materials science, optimization</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-indigo-900 mb-1">🔢 Matrix Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                        <div><strong>Properties:</strong> Mix of symmetric/Hermitian and non-symmetric</div>
                        <div><strong>Types:</strong> Positive definite and indefinite matrices</div>
                        <div><strong>Distribution:</strong> Block cyclic, block row/column</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-indigo-900 mb-1">📏 Problem Scale & Precision</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Sizes:</strong> Small (&lt;1K) to Very Large (100K-1M)</div>
                        <div><strong>Precision:</strong> FP64 standard, some FP32, mixed precision</div>
                        <div><strong>Methods:</strong> Direct (LU, Cholesky, QR) and iterative (CG, GMRES, BiCGStab)</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-indigo-900 mb-1">📚 Libraries & Patterns</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Distributed:</strong> ScaLAPACK, SLATE, DPLASMA</div>
                        <div><strong>Shared Memory:</strong> LAPACK, PETSc, cuSOLVER</div>
                        <div><strong>Patterns:</strong> Large-scale single problems, repeated similar-sized</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Polynomial Filtering */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-pink-900 mb-3">Polynomial Filtering & Matrix Functions</h3>
                <div className="text-sm text-pink-800 space-y-3">
                  <div className="bg-pink-100 rounded-lg p-3">
                    <div className="font-semibold text-pink-900 mb-1">📊 Scale & Impact</div>
                    <div>{analytics.operationPopularity['polynomial-filtering'] || 0} applications • Specialized for eigenvalue computation and matrix functions (NTChem)</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-pink-900 mb-1">🎯 Primary Uses</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Main:</strong> Density matrix approximation without diagonalization</div>
                        <div><strong>Additional:</strong> Spectral filtering, subspace isolation/projection</div>
                        <div><strong>Applications:</strong> TDDFT, Fermi operator expansion (FOE)</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-pink-900 mb-1">🔢 Matrix & Polynomial Properties</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Matrix Types:</strong> Hamiltonian, overlap, Fock, density, Green&apos;s function</div>
                        <div><strong>Structure:</strong> Dense most common, sparse, block sparse</div>
                        <div><strong>Properties:</strong> Hermitian/symmetric, positive definite, some indefinite</div>
                        <div><strong>Polynomials:</strong> Chebyshev, Legendre, custom expansions</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-pink-900 mb-1">📏 Problem Scale & Precision</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Sizes:</strong> Large (10K-100K) to Very Large (100K-1M)</div>
                        <div><strong>Precision:</strong> FP64 standard, some mixed precision</div>
                        <div><strong>Polynomial Degrees:</strong> High degree (50-200) most common</div>
                        <div><strong>Storage:</strong> Dense col/row-major, CSR/CSC for sparse</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="font-semibold text-pink-900 mb-1">📚 Libraries & Patterns</div>
                      <div className="text-xs space-y-1">
                        <div><strong>Libraries:</strong> Custom implementations, Chebyshev-based</div>
                        <div><strong>Specialized:</strong> Matrix function libraries</div>
                        <div><strong>Patterns:</strong> Large-scale single problems, time evolution</div>
                        <div><strong>Scaling:</strong> Both strong and weak scaling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Non-Symmetric Eigenvalue */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Symmetric Eigenvalue Problems</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• {analytics.operationPopularity['non-symmetric-eigenvalue'] || 0} applications currently</li>
                  <li>• No current applications reported using this operation</li>
                  <li>• Potential future need for specialized applications</li>
                  <li>• Would likely require high precision for numerical stability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* NLA Libraries Overview */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg mb-8 border border-purple-100">
          <div className="px-6 py-5 border-b border-purple-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">NLA Libraries Ecosystem</h2>
                <p className="text-purple-600 font-medium">Comprehensive library usage across 14 applications (used, interested, or mentioned)</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Popular Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Most Popular Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-200 pl-3">
                    <div className="font-medium text-gray-900">LAPACK (13 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K, Quantum ESPRESSO, SIESTA, libNEGF<br/>
                      <span className="text-blue-600">Interest by:</span> CASTEP, DFTB+, FHI-aims, Yambo, unknown<br/>
                      <span className="text-gray-500">Mentioned by:</span> LAPACK, Principle modes
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-3">
                    <div className="font-medium text-gray-900">ScaLAPACK (12 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K, Quantum ESPRESSO, SIESTA, libNEGF<br/>
                      <span className="text-blue-600">Interest by:</span> CASTEP, DFTB+, FHI-aims, Yambo, unknown<br/>
                      <span className="text-gray-500">Mentioned by:</span> Principle modes
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-3">
                    <div className="font-medium text-gray-900">ELPA (11 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K, Quantum ESPRESSO, SIESTA<br/>
                      <span className="text-blue-600">Interest by:</span> CASTEP, DFTB+, FHI-aims, NTChem, Yambo, unknown<br/>
                      <span className="text-gray-500">Mentioned by:</span> SIESTA
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-3">
                    <div className="font-medium text-gray-900">ChASE (8 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> CP2K, DFTB+, FHI-aims, NTChem, Quantum ESPRESSO, SIESTA, Yambo, unknown
                    </div>
                  </div>
                </div>
              </div>

              {/* GPU & Accelerated Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  GPU & Accelerated Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-200 pl-3">
                    <div className="font-medium text-gray-900">cuSolver (6 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K, libNEGF<br/>
                      <span className="text-blue-600">Interest by:</span> CP2K, SIESTA, libNEGF<br/>
                      <span className="text-gray-500">Mentioned by:</span> Yambo
                    </div>
                  </div>
                  <div className="border-l-4 border-green-200 pl-3">
                    <div className="font-medium text-gray-900">cuSolverMp (5 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K<br/>
                      <span className="text-blue-600">Interest by:</span> CP2K, SIESTA, libNEGF<br/>
                      <span className="text-gray-500">Mentioned by:</span> Yambo
                    </div>
                  </div>
                  <div className="border-l-4 border-green-200 pl-3">
                    <div className="font-medium text-gray-900">cuBLASMp (3 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> CP2K, FHI-aims, unknown
                    </div>
                  </div>
                  <div className="border-l-4 border-green-200 pl-3">
                    <div className="font-medium text-gray-900">cuBLAS (3 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> CP2K, FHI-aims, unknown
                    </div>
                  </div>
                </div>
              </div>

              {/* Distributed & Future Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Distributed & Future Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-orange-200 pl-3">
                    <div className="font-medium text-gray-900">DLA-Future (6 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K<br/>
                      <span className="text-blue-600">Interest by:</span> CP2K, FHI-aims, Quantum ESPRESSO, SIESTA, unknown
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-200 pl-3">
                    <div className="font-medium text-gray-900">SLATE (4 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> DFTB+, Quantum ESPRESSO, SIESTA, unknown
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-200 pl-3">
                    <div className="font-medium text-gray-900">DPLASMA (2 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> Quantum ESPRESSO, SIESTA
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-200 pl-3">
                    <div className="font-medium text-gray-900">PLASMA (3 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> Quantum ESPRESSO, SIESTA<br/>
                      <span className="text-gray-500">Mentioned by:</span> PLASMA
                    </div>
                  </div>
                </div>
              </div>

              {/* Sparse & Specialized Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Sparse & Specialized Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-200 pl-3">
                    <div className="font-medium text-gray-900">PEXSI (3 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> CP2K, SIESTA<br/>
                      <span className="text-blue-600">Interest by:</span> SIESTA
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-3">
                    <div className="font-medium text-gray-900">ELSI (5 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> DFTB+, FHI-aims, SIESTA<br/>
                      <span className="text-blue-600">Interest by:</span> NTChem, unknown
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-3">
                    <div className="font-medium text-gray-900">SuperLU / SuperLU_DIST (2 each)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> libNEGF<br/>
                      <span className="text-blue-600">Interest by:</span> SIESTA
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-3">
                    <div className="font-medium text-gray-900">MUMPS (2 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> SIESTA<br/>
                      <span className="text-blue-600">Interest by:</span> SIESTA
                    </div>
                  </div>
                </div>
              </div>

              {/* Eigenvalue & Iterative Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Eigenvalue & Iterative Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-teal-200 pl-3">
                    <div className="font-medium text-gray-900">SLEPc (2 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> FHI-aims<br/>
                      <span className="text-gray-500">Mentioned by:</span> Yambo
                    </div>
                  </div>
                  <div className="border-l-4 border-teal-200 pl-3">
                    <div className="font-medium text-gray-900">PETSc (2 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> CASTEP<br/>
                      <span className="text-gray-500">Mentioned by:</span> Yambo
                    </div>
                  </div>
                  <div className="border-l-4 border-teal-200 pl-3">
                    <div className="font-medium text-gray-900">BLAS (4 mentions)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600">Interest by:</span> CP2K, FHI-aims, unknown<br/>
                      <span className="text-gray-500">Mentioned by:</span> PLASMA
                    </div>
                  </div>
                </div>
              </div>

              {/* Application-Specific Libraries */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Application-Specific Libraries
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-pink-200 pl-3">
                    <div className="font-medium text-gray-900">NTPoly (1 mention)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> NTChem
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-200 pl-3">
                    <div className="font-medium text-gray-900">Libint / Libxc (1 each)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> SIESTA
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-200 pl-3">
                    <div className="font-medium text-gray-900">Ginkgo (1 mention)</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> Ginkgo
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-200 pl-3">
                    <div className="font-medium text-gray-900">Internal Libraries</div>
                    <div className="text-sm text-gray-600">
                      <span className="text-green-600">Used by:</span> Quantum ESPRESSO (LAXlib, Internal routines, KS solvers)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-purple-800">
                    <strong>Comprehensive library ecosystem insights:</strong> This analysis covers all 14 survey applications and reveals 35+ unique NLA libraries. 
                    <span className="text-green-600">Green</span> indicates current usage, <span className="text-blue-600">blue</span> shows future interest, and <span className="text-gray-500">gray</span> indicates general mentions.
                    Key findings: LAPACK and ScaLAPACK dominate usage, strong interest in GPU acceleration (cuSolver, cuSolverMp), growing adoption of modern distributed libraries (ELPA, SLATE), and specialized libraries for quantum chemistry (Libint, Libxc) and polynomial filtering (NTPoly).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Future Needs */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg mb-8 border border-blue-100">
          <div className="px-6 py-5 border-b border-blue-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">Future Needs & Requirements</h2>
                <p className="text-blue-600 font-medium">Most requested features and improvements from the community</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(analytics.futureNeeds)
                .sort(([,a], [,b]) => b - a)
                .map(([feature, count]) => {
                  
                  return (
                    <div key={feature} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight">{feature}</h3>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {count} requests
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">
                          {count} request{count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>Community-driven priorities:</strong> These requirements represent the collective voice of the ExaNLA community, 
                    helping guide future development efforts and resource allocation for numerical linear algebra libraries and tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
