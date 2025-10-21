'use client';

import { useState, useEffect } from 'react';
import { SurveyResponse, formatOperationName, formatLibraryName } from '@/lib/surveyAnalytics';

interface DetailedInsight {
  title: string;
  description: string;
  data: Record<string, unknown>;
  type: 'trend' | 'comparison' | 'distribution' | 'correlation';
  priority: 'high' | 'medium' | 'low';
}

export default function DetailedInsightsPage() {
  const [insights, setInsights] = useState<DetailedInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const operations = ['matrix-multiplication', 'standard-eigenvalue', 'generalized-eigenvalue', 'cholesky-factorization', 'qr-factorization', 'matrix-inversion'];

  useEffect(() => {
    loadSurveyData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const surveyFiles = [
        'CASTEP.json', 'cp2k.json', 'DFTB+-1.json', 'DFTB+-2.json', 
        'FHI-AIMS.json', 'Ginkgo.json', 'LAPACK.json', 'libngef.json',
        'PLASMA.json', 'principleModes.json', 'quantum-espresso.json',
        'siesta-1.json', 'siesta-2.json', 'unknown.json', 'yambo-1.json', 'yambo-2.json'
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

      setInsights(generateDetailedInsights(loadedResponses));
    } catch (err) {
      setError('Failed to load survey data');
      console.error('Error loading survey data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateDetailedInsights = (responses: SurveyResponse[]): DetailedInsight[] => {
    const insights: DetailedInsight[] = [];

    // Insight 1: Operation Correlation Analysis
    const operationCorrelations: Record<string, Record<string, number>> = {};
    const operations = ['matrix-multiplication', 'standard-eigenvalue', 'generalized-eigenvalue', 'cholesky-factorization', 'qr-factorization', 'matrix-inversion'];
    
    operations.forEach(op1 => {
      operationCorrelations[op1] = {};
      operations.forEach(op2 => {
        if (op1 !== op2) {
          const bothSelected = responses.filter(r => r[op1 as keyof SurveyResponse] === true && r[op2 as keyof SurveyResponse] === true).length;
          const totalWithOp1 = responses.filter(r => r[op1 as keyof SurveyResponse] === true).length;
          operationCorrelations[op1][op2] = totalWithOp1 > 0 ? (bothSelected / totalWithOp1) * 100 : 0;
        }
      });
    });

    insights.push({
      title: 'Operation Usage Patterns',
      description: 'Analysis of which NLA operations are commonly used together, revealing workflow patterns and dependencies.',
      data: operationCorrelations,
      type: 'correlation',
      priority: 'high'
    });

    // Insight 2: Domain-Specific Requirements
    const domainRequirements: Record<string, Record<string, number>> = {};
    const domains = [...new Set(responses.map(r => r['domain-selection']))];
    
    domains.forEach(domain => {
      domainRequirements[domain] = {};
      operations.forEach(op => {
        const domainResponses = responses.filter(r => r['domain-selection'] === domain);
        const opUsage = domainResponses.filter(r => r[op as keyof SurveyResponse] === true).length;
        domainRequirements[domain][op] = domainResponses.length > 0 ? (opUsage / domainResponses.length) * 100 : 0;
      });
    });

    insights.push({
      title: 'Domain-Specific Operation Requirements',
      description: 'Breakdown of NLA operation usage by research domain, highlighting domain-specific computational needs.',
      data: domainRequirements,
      type: 'distribution',
      priority: 'high'
    });

    // Insight 3: Library Ecosystem Analysis
    const libraryEcosystem: Record<string, string[]> = {};
    responses.forEach(r => {
      const libraries = [
        ...(r['gemm-interested-libraries'] || []),
        ...(r['sym-herm-interested-libraries'] || []),
        ...(r['gen-sym-interested-libraries'] || []),
        ...(r['dense-libs-used'] || []),
        ...(r['specialized-libs-used'] || [])
      ];
      
      libraries.forEach(lib => {
        if (!libraryEcosystem[lib]) {
          libraryEcosystem[lib] = [];
        }
        if (!libraryEcosystem[lib].includes(r['library-name'])) {
          libraryEcosystem[lib].push(r['library-name']);
        }
      });
    });

    insights.push({
      title: 'Library Ecosystem Mapping',
      description: 'Mapping of which libraries are used together across different applications, revealing the current NLA software ecosystem.',
      data: libraryEcosystem,
      type: 'correlation',
      priority: 'medium'
    });

    // Insight 4: Performance Requirements Analysis
    const performanceRequirements: Record<string, Record<string, number>> = {
      matrixSizes: {},
      precisionTypes: {},
      scalingTypes: {}
    };

    // Matrix size analysis
    responses.forEach(r => {
      if (r['gemm-matrix-size']) {
        r['gemm-matrix-size'].forEach(size => {
          performanceRequirements.matrixSizes[size] = (performanceRequirements.matrixSizes[size] || 0) + 1;
        });
      }
    });

    // Precision analysis
    responses.forEach(r => {
      if (r['gemm-precision-type']) {
        r['gemm-precision-type'].forEach(precision => {
          performanceRequirements.precisionTypes[precision] = (performanceRequirements.precisionTypes[precision] || 0) + 1;
        });
      }
    });

    // Scaling analysis
    responses.forEach(r => {
      if (r['gemm-scaling-requirements']) {
        r['gemm-scaling-requirements'].forEach(scaling => {
          performanceRequirements.scalingTypes[scaling] = (performanceRequirements.scalingTypes[scaling] || 0) + 1;
        });
      }
    });

    insights.push({
      title: 'Performance Requirements Landscape',
      description: 'Comprehensive analysis of computational requirements including matrix sizes, precision needs, and scaling requirements.',
      data: performanceRequirements,
      type: 'distribution',
      priority: 'high'
    });

    // Insight 5: Future Needs Prioritization
    const futureNeedsAnalysis: Record<string, { count: number; libraries: string[] }> = {};
    responses.forEach(r => {
      if (r['gemm-future-features']) {
        r['gemm-future-features'].forEach(feature => {
          // If feature is "Other (please specify):", use the actual feature from gemm-future-features-other
          let actualFeature = feature;
          if (feature === 'Other (please specify):' && r['gemm-future-features-other']) {
            actualFeature = r['gemm-future-features-other'] as string;
          } else if (feature === 'Other (please specify):') {
            return; // Skip if no other specification provided
          }
          
          if (!futureNeedsAnalysis[actualFeature]) {
            futureNeedsAnalysis[actualFeature] = { count: 0, libraries: [] };
          }
          futureNeedsAnalysis[actualFeature].count++;
          if (!futureNeedsAnalysis[actualFeature].libraries.includes(r['library-name'])) {
            futureNeedsAnalysis[actualFeature].libraries.push(r['library-name']);
          }
        });
      }
    });

    insights.push({
      title: 'Future Development Priorities',
      description: 'Analysis of requested features and improvements, prioritized by frequency and library coverage.',
      data: futureNeedsAnalysis,
      type: 'trend',
      priority: 'high'
    });

    // Insight 6: Matrix Shape Analysis
    const matrixShapeAnalysis: Record<string, number> = {};
    responses.forEach(r => {
      if (r['gemm-matrix-shape']) {
        r['gemm-matrix-shape'].forEach(shape => {
          matrixShapeAnalysis[shape] = (matrixShapeAnalysis[shape] || 0) + 1;
        });
      }
    });

    insights.push({
      title: 'Matrix Shape Patterns',
      description: 'Analysis of typical matrix shapes in multiplication operations, revealing computational patterns and optimization opportunities.',
      data: matrixShapeAnalysis,
      type: 'distribution',
      priority: 'medium'
    });

    return insights;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend': return '📈';
      case 'comparison': return '⚖️';
      case 'distribution': return '📊';
      case 'correlation': return '🔗';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading detailed insights...</p>
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
            Detailed Survey Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep dive analysis of ExaNLA survey data revealing patterns, correlations, 
            and strategic insights for the numerical linear algebra community
          </p>
        </div>

        {/* Insights Grid */}
        <div className="space-y-8">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(insight.type)}</span>
                    <h2 className="text-2xl font-semibold text-gray-900">{insight.title}</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(insight.priority)}`}>
                    {insight.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{insight.description}</p>
              </div>
              
              <div className="p-6">
                {insight.type === 'correlation' && insight.title === 'Operation Usage Patterns' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Operation Co-occurrence Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                            {operations.map(op => (
                              <th key={op} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {formatOperationName(op).split(' ')[0]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {operations.map(op1 => (
                            <tr key={op1}>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {formatOperationName(op1).split(' ')[0]}
                              </td>
                              {operations.map(op2 => (
                                <td key={op2} className="px-4 py-3 text-center text-sm text-gray-900">
                                  {op1 === op2 ? (
                                    <span className="text-gray-400">-</span>
                                  ) : (
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      (insight.data[op1] as Record<string, number>)[op2] > 50 ? 'bg-green-100 text-green-800' :
                                      (insight.data[op1] as Record<string, number>)[op2] > 25 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {(insight.data[op1] as Record<string, number>)[op2].toFixed(0)}%
                                    </span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {insight.type === 'distribution' && insight.title === 'Domain-Specific Operation Requirements' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Operation Usage by Domain</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(insight.data).map(([domain, requirements]) => (
                        <div key={domain} className="space-y-3">
                          <h4 className="font-medium text-gray-900">{domain}</h4>
                          <div className="space-y-2">
                            {Object.entries(requirements as Record<string, number>)
                              .sort(([,a], [,b]) => b - a)
                              .map(([operation, percentage]) => (
                                <div key={operation} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-700">
                                    {formatOperationName(operation).split(' ')[0]}
                                  </span>
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${percentage}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                      {percentage.toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {insight.type === 'correlation' && insight.title === 'Library Ecosystem Mapping' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Library Usage Across Applications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(insight.data as Record<string, string[]>)
                        .sort(([,a], [,b]) => b.length - a.length)
                        .slice(0, 12)
                        .map(([library, applications]) => (
                          <div key={library} className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">{formatLibraryName(library)}</h4>
                            <div className="text-sm text-gray-600">
                              <div className="mb-1">Used in {applications.length} applications:</div>
                              <div className="flex flex-wrap gap-1">
                                {applications.slice(0, 3).map(app => (
                                  <span key={app} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    {app}
                                  </span>
                                ))}
                                {applications.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                    +{applications.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {insight.type === 'trend' && insight.title === 'Future Development Priorities' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Feature Request Analysis</h3>
                    <div className="space-y-3">
                      {Object.entries(insight.data as Record<string, { count: number; libraries: string[] }>)
                        .sort(([,a], [,b]) => b.count - a.count)
                        .map(([feature, data]) => (
                          <div key={feature} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{feature}</h4>
                              <span className="text-sm font-bold text-blue-600">{data.count} requests</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Requested by: {data.libraries.join(', ')}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {insight.type === 'distribution' && insight.title === 'Matrix Shape Patterns' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Matrix Shape Distribution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(insight.data as Record<string, number>)
                        .sort(([,a], [,b]) => b - a)
                        .map(([shape, count]) => (
                          <div key={shape} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-900">{shape}</span>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(count / Math.max(...Object.values(insight.data as Record<string, number>))) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{count}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Export and Actions */}
        <div className="mt-12 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Export & Actions</h2>
            <p className="text-gray-600">Download detailed insights and analysis data</p>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const dataStr = JSON.stringify(insights, null, 2);
                  const dataBlob = new Blob([dataStr], {type: 'application/json'});
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'exanla-detailed-insights.json';
                  link.click();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Insights (JSON)
              </button>
              
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Print Report
              </button>
              
              <a 
                href="/survey/results"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View Summary Results
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
