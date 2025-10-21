export interface SurveyResponse {
  'contact-name': string;
  'library-name': string;
  'contact-email': string;
  'contact-organization': string;
  'library-version': string;
  'current-use-case': string;
  'domain-selection': string;
  'domain-selection-other'?: string;
  'library-description'?: string;
  'multiple-use-cases': string;
  'materials-functions'?: string[];
  'materials-other-specify'?: string;
  'other-nla-operation': boolean;
  'other-nla-operation-specify'?: string;
  
  // NLA Operations
  'matrix-multiplication': boolean;
  'standard-eigenvalue': boolean;
  'generalized-eigenvalue': boolean;
  'symmetric-hermitian': boolean;
  'quasi-hermitian-bse': boolean;
  'non-symmetric-eigenvalue': boolean;
  'gen-symmetric-hermitian': boolean;
  'cholesky-factorization': boolean;
  'qr-factorization': boolean;
  'matrix-inversion': boolean;
  'linear-system-solvers': boolean;
  'polynomial-filtering': boolean;
  
  // Matrix Multiplication Details
  'gemm-matrix-size'?: string[];
  'gemm-matrix-shape'?: string[];
  'gemm-matrix-format'?: string[];
  'gemm-matrix-structure'?: string[];
  'gemm-matrix-distribution'?: string[];
  'gemm-operation-types'?: string[];
  'gemm-precision-type'?: string[];
  'gemm-batch-size'?: string[];
  'gemm-data-provision'?: string[];
  'gemm-input-data-type'?: string[];
  'gemm-future-features'?: string[];
  'gemm-future-features-other'?: string;
  'gemm-interested-libraries'?: string[];
  'gemm-interested-libraries-other'?: string;
  'gemm-libraries-distributed'?: string[];
  'gemm-libraries-distributed-other'?: string;
  'gemm-scaling-requirements'?: string[];
  'gemm-special-implementations'?: string[];
  'gemm-special-implementations-other'?: string;
  
  // Standard Eigenvalue Details
  'sym-herm-scale-size'?: string[];
  'sym-herm-matrix-format'?: string[];
  'sym-herm-matrix-structure'?: string[];
  'sym-herm-matrix-distribution'?: string[];
  'sym-herm-compute-mode'?: string;
  'sym-herm-physical-problem'?: string[];
  'sym-herm-data-provision'?: string[];
  'sym-herm-input-data-type'?: string[];
  'sym-herm-precision-type'?: string[];
  'sym-herm-computation-type'?: string[];
  'sym-herm-scaling-requirements'?: string[];
  'sym-herm-eigenvalue-location'?: string;
  'sym-herm-eigenvalue-percentage'?: string;
  'sym-herm-eigenvalue-distribution'?: string;
  'sym-herm-orthogonality-tolerance'?: string;
  'sym-herm-residual-tolerance'?: string;
  'sym-herm-interested-libraries'?: string[];
  'sym-herm-nla-group-distributed'?: string[];
  'sym-herm-spd'?: string;
  
  // Generalized Eigenvalue Details
  'gen-sym-herm-scale-size'?: string;
  'gen-sym-matrix-structure'?: string[];
  'gen-sym-computation-type'?: string[];
  'gen-sym-reduction-method'?: string;
  'gen-sym-reduction-needed'?: string;
  'gen-sym-precision-type'?: string[];
  'gen-sym-herm-compute-mode'?: string;
  'gen-sym-herm-residual-type'?: string;
  'gen-sym-herm-data-provision'?: string[];
  'gen-sym-herm-input-data-type'?: string[];
  'gen-sym-herm-eigenvalue-location'?: string;
  'gen-sym-herm-eigenvalue-percentage'?: string;
  'gen-sym-herm-eigenvalue-distribution'?: string;
  'gen-sym-herm-orthogonality-tolerance'?: string;
  'gen-sym-herm-absolute-residual-tolerance'?: string;
  'gen-sym-herm-relative-residual-tolerance'?: string;
  'gen-sym-interested-libraries'?: string[];
  'gen-sym-scaling-requirements'?: string[];
  'gen-sym-nla-distributed-dense'?: string[];
  'gen-sym-nla-iterative'?: string[];
  'gen-sym-nla-iterative-other'?: string;
  
  // Cholesky Factorization Details
  'cholesky-matrix-size'?: string;
  'cholesky-matrix-format'?: string[];
  'cholesky-matrix-distribution'?: string[];
  'cholesky-matrix-distribution-other'?: string;
  'cholesky-data-provision'?: string[];
  'cholesky-input-data-type'?: string[];
  'cholesky-precision-type'?: string[];
  'cholesky-computation-type'?: string[];
  'cholesky-condition-number'?: string;
  'cholesky-diagonal-dominance'?: string;
  'cholesky-sparsity-structure'?: string;
  'cholesky-sparsity-structure-other'?: string;
  'cholesky-factorization-tolerance'?: string;
  'cholesky-scaling-requirements'?: string[];
  'cholesky-nla-group-distributed-used'?: string[];
  'cholesky-nla-group-distributed-used-other'?: string;
  'cholesky-nla-group-distributed-interested'?: string[];
  'cholesky-nla-group-specialized-used'?: string[];
  'cholesky-nla-group-specialized-used-other'?: string;
  'cholesky-nla-group-specialized-interested'?: string[];
  'cholesky-nla-group-specialized-interested-other'?: string;
  
  // QR Factorization Details
  'qr-scale-size'?: string;
  'qr-matrix-format'?: string[];
  'qr-matrix-distribution'?: string[];
  'qr-data-provision'?: string[];
  'qr-input-data-type'?: string[];
  'qr-precision-type'?: string[];
  'qr-computation-type'?: string[];
  'qr-matrix-structure'?: string[];
  'qr-aspect-ratio'?: string;
  'qr-compute-mode'?: string[];
  'qr-q-handling'?: string;
  'qr-condition'?: string;
  'qr-orthogonality'?: string;
  'qr-factorization-accuracy'?: string;
  'qr-scaling-requirements'?: string[];
  'qr-nla-group-distributed-used'?: string[];
  'qr-nla-group-specialized-used'?: string[];
  'qr-nla-group-specialized-used-other'?: string;
  'qr-nla-group-distributed-interested'?: string[];
  'qr-nla-group-specialized-interested'?: string[];
  'qr-nla-group-specialized-interested-other'?: string;
  
  // Matrix Inversion Details
  'matrix-inversion-size'?: string;
  'matrix-inversion-format'?: string[];
  'matrix-inversion-distribution'?: string[];
  'matrix-inversion-structure'?: string[];
  'matrix-inversion-data-provision'?: string[];
  'matrix-inversion-input-data-type'?: string[];
  'matrix-inversion-precision-type'?: string[];
  'matrix-inversion-computation-type'?: string[];
  'matrix-inversion-residual'?: string;
  'matrix-inversion-linear-system'?: string;
  'matrix-inversion-purpose-usecases'?: string[];
  'matrix-inversion-properties-mathematical'?: string[];
  
  // Library Usage
  'dense-libs-used'?: string[];
  'dense-libs-interest'?: string[];
  'specialized-libs-used'?: string[];
  'specialized-libs-interest'?: string[];
}

export interface SurveyAnalytics {
  totalResponses: number;
  responseRate: number;
  operationPopularity: Record<string, number>;
  domainDistribution: Record<string, number>;
  libraryDistribution: Record<string, number>;
  organizationDistribution: Record<string, number>;
  matrixSizeDistribution: Record<string, number>;
  precisionTypeDistribution: Record<string, number>;
  scalingRequirementsDistribution: Record<string, number>;
  libraryUsagePatterns: Record<string, number>;
  futureNeeds: Record<string, number>;
  performanceRequirements: {
    matrixSizes: Record<string, number>;
    precisionTypes: Record<string, number>;
    scalingTypes: Record<string, number>;
  };
  insights: {
    topOperations: string[];
    mostPopularLibraries: string[];
    commonPainPoints: string[];
    emergingNeeds: string[];
  };
}

export function loadSurveyData(): SurveyResponse[] {
  // This would typically load from a database or API
  // For now, we'll return an empty array and load data dynamically
  return [];
}

export function analyzeSurveyData(responses: SurveyResponse[]): SurveyAnalytics {
  try {
    const totalResponses = responses.length;
  
  // Operation popularity
  const operationPopularity: Record<string, number> = {};
  const operations = [
    'matrix-multiplication',
    'generalized-eigenvalue',
    'symmetric-hermitian',
    'gen-symmetric-hermitian',
    'quasi-hermitian-bse',
    'non-symmetric-eigenvalue',
    'cholesky-factorization',
    'qr-factorization',
    'matrix-inversion',
    'linear-system-solvers',
    'polynomial-filtering'
  ];
  
  operations.forEach(op => {
    operationPopularity[op] = responses.filter(r => r[op as keyof SurveyResponse] === true).length;
  });
  
  // Domain distribution
  const domainDistribution: Record<string, number> = {};
  
  // Function to normalize domain names
  const normalizeDomain = (domain: string): string | null => {
    // Handle null, undefined, or empty domains - skip them instead of marking as Unknown
    if (!domain || typeof domain !== 'string') {
      return null; // Return null to skip this response
    }
    
    const normalized = domain.toLowerCase().trim();
    
    // Group numerical linear algebra variations
    if (normalized.includes('numerical linear algebra')) {
      return 'Numerical Linear Algebra';
    }
    
    // Group materials science variations
    if (normalized.includes('materials science') || normalized.includes('materials science, but also quantum chemistry')) {
      return 'Materials Science';
    }
    
    // Group quantum chemistry variations
    if (normalized.includes('quantum chemistry') || normalized === 'chemistry' || normalized.includes('mostly quantum chemistry')) {
      return 'Quantum Chemistry';
    }
    
    // Group physics variations
    if (normalized.includes('maxwell') || normalized.includes('physics') || normalized.includes('electromagnetic') || normalized.includes('optics')) {
      return 'Physics';
    }
    
    // Group statistics
    if (normalized.includes('statistics') || normalized.includes('statistical')) {
      return 'Statistics';
    }
    
    // Return original if no match
    return domain;
  };
  
  responses.forEach(r => {
    try {
      let domain = r['domain-selection'];
      // If domain is "Other (please specify):", use the actual domain from domain-selection-other
      if (domain === 'Other (please specify):' && r['domain-selection-other']) {
        domain = r['domain-selection-other'] as string;
      }
      
      // Normalize the domain name
      const normalizedDomain = normalizeDomain(domain);
      // Only count if domain is not null (skip responses without valid domains)
      if (normalizedDomain) {
        domainDistribution[normalizedDomain] = (domainDistribution[normalizedDomain] || 0) + 1;
      }
    } catch (err) {
      console.warn('Error processing domain for response:', r['library-name'], err);
      // Skip this response instead of adding to Unknown
    }
  });
  
  // Library distribution
  const libraryDistribution: Record<string, number> = {};
  responses.forEach(r => {
    const library = r['library-name'] || 'undefined';
    libraryDistribution[library] = (libraryDistribution[library] || 0) + 1;
  });
  
  // Organization distribution
  const organizationDistribution: Record<string, number> = {};
  responses.forEach(r => {
    const org = r['contact-organization'];
    organizationDistribution[org] = (organizationDistribution[org] || 0) + 1;
  });
  
  // Matrix size distribution (from matrix multiplication)
  const matrixSizeDistribution: Record<string, number> = {};
  responses.forEach(r => {
    if (r['matrix-multiplication'] && r['gemm-matrix-size']) {
      r['gemm-matrix-size'].forEach(size => {
        matrixSizeDistribution[size] = (matrixSizeDistribution[size] || 0) + 1;
      });
    }
  });
  
  // Precision type distribution
  const precisionTypeDistribution: Record<string, number> = {};
  responses.forEach(r => {
    if (r['gemm-precision-type']) {
      r['gemm-precision-type'].forEach(precision => {
        precisionTypeDistribution[precision] = (precisionTypeDistribution[precision] || 0) + 1;
      });
    }
  });
  
  // Scaling requirements distribution
  const scalingRequirementsDistribution: Record<string, number> = {};
  responses.forEach(r => {
    if (r['gemm-scaling-requirements']) {
      r['gemm-scaling-requirements'].forEach(scaling => {
        scalingRequirementsDistribution[scaling] = (scalingRequirementsDistribution[scaling] || 0) + 1;
      });
    }
  });
  
  // Library usage patterns
  const libraryUsagePatterns: Record<string, number> = {};
  responses.forEach(r => {
    // Collect all library mentions
    const libraries = [
      ...(r['gemm-interested-libraries'] || []),
      ...(r['sym-herm-interested-libraries'] || []),
      ...(r['gen-sym-interested-libraries'] || []),
      ...(r['dense-libs-used'] || []),
      ...(r['dense-libs-interest'] || []),
      ...(r['specialized-libs-used'] || []),
      ...(r['specialized-libs-interest'] || [])
    ];
    
    libraries.forEach(lib => {
      libraryUsagePatterns[lib] = (libraryUsagePatterns[lib] || 0) + 1;
    });
  });
  
  // Future needs
  const futureNeeds: Record<string, number> = {};
  responses.forEach(r => {
    if (r['gemm-future-features']) {
      r['gemm-future-features'].forEach(feature => {
        // If feature is "Other (please specify):", use the actual feature from gemm-future-features-other
        if (feature === 'Other (please specify):' && r['gemm-future-features-other']) {
          const otherFeature = r['gemm-future-features-other'] as string;
          futureNeeds[otherFeature] = (futureNeeds[otherFeature] || 0) + 1;
        } else if (feature !== 'Other (please specify):') {
          futureNeeds[feature] = (futureNeeds[feature] || 0) + 1;
        }
      });
    }
  });
  
  // Generate insights
  const topOperations = Object.entries(operationPopularity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([op]) => op);
    
  const mostPopularLibraries = Object.entries(libraryUsagePatterns)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([lib]) => lib);
    
  const commonPainPoints: string[] = [];
  const emergingNeeds = Object.entries(futureNeeds)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([need]) => need);
  
    return {
      totalResponses,
      responseRate: totalResponses, // This would be calculated based on total invitations
      operationPopularity,
      domainDistribution,
      libraryDistribution,
      organizationDistribution,
      matrixSizeDistribution,
      precisionTypeDistribution,
      scalingRequirementsDistribution,
      libraryUsagePatterns,
      futureNeeds,
      performanceRequirements: {
        matrixSizes: matrixSizeDistribution,
        precisionTypes: precisionTypeDistribution,
        scalingTypes: scalingRequirementsDistribution
      },
      insights: {
        topOperations,
        mostPopularLibraries,
        commonPainPoints,
        emergingNeeds
      }
    };
  } catch (error) {
    console.error('Error in analyzeSurveyData:', error);
    // Return a minimal analytics object to prevent complete failure
    return {
      totalResponses: responses.length,
      responseRate: responses.length,
      operationPopularity: {},
      domainDistribution: {},
      libraryDistribution: {},
      organizationDistribution: {},
      matrixSizeDistribution: {},
      precisionTypeDistribution: {},
      scalingRequirementsDistribution: {},
      libraryUsagePatterns: {},
      futureNeeds: {},
      performanceRequirements: {
        matrixSizes: {},
        precisionTypes: {},
        scalingTypes: {}
      },
      insights: {
        topOperations: [],
        mostPopularLibraries: [],
        commonPainPoints: [],
        emergingNeeds: []
      }
    };
  }
}

export function formatOperationName(operation: string): string {
  const operationNames: Record<string, string> = {
    'matrix-multiplication': 'Matrix Multiplication',
    'standard-eigenvalue': 'Standard Eigenvalue Problems',
    'generalized-eigenvalue': 'Generalized Eigenvalue Problems',
    'symmetric-hermitian': 'Symmetric/Hermitian Eigenvalue',
    'gen-symmetric-hermitian': 'Generalized Symmetric/Hermitian',
    'cholesky-factorization': 'Cholesky Factorization',
    'qr-factorization': 'QR Factorization',
    'matrix-inversion': 'Matrix Inversion',
    'linear-system-solvers': 'Linear System Solvers'
  };
  
  return operationNames[operation] || operation;
}

export function formatLibraryName(library: string): string {
  const libraryNames: Record<string, string> = {
    'ScaLAPACK': 'ScaLAPACK',
    'ELPA': 'ELPA',
    'ChASE': 'ChASE',
    'DLA-Future': 'DLA-Future',
    'SLATE': 'SLATE',
    'COSMA': 'COSMA',
    'PETSc': 'PETSc',
    'cuBLASMp': 'cuBLASMp',
    'cuSolverMp': 'cuSolverMp',
    'FEAST': 'FEAST',
    'PEXSI': 'PEXSI',
    'H2Lib': 'H2Lib',
    'HLIBpro': 'HLIBpro',
    'DPLASMA': 'DPLASMA'
  };
  
  return libraryNames[library] || library;
}
