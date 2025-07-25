import { SurveySection } from './types';

export const polynomialFilteringData: SurveySection[] = [
  {
    id: 'polynomial-filtering-section',
    title: 'Polynomial Filtering and Matrix Functions',
    description: 'Details about polynomial filtering and matrix function evaluations p(A) in your applications.',
    questions: [
      // Application Purpose
      {
        id: 'poly-purpose',
        title: 'Application Purpose',
        type: 'section',
        children: [
          {
            id: 'poly-primary-use',
            title: 'Primary Use Cases',
            type: 'checkbox',
            content: 'What are your main uses for polynomial filtering? Select all that apply:',
            options: [
              'Density matrix approximation without diagonalization',
              'Spectral filtering in eigensolvers',
              'Subspace isolation/projection',
              'Time propagation in TDDFT',
              'Fermi operator expansion (FOE)',
              'Green\'s function approximation',
              'Matrix sign function',
              'Wannier function localization',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Matrix Context
      {
        id: 'poly-matrix-context',
        title: 'Matrix Context',
        type: 'section',
        children: [
          {
            id: 'poly-matrix-type',
            title: 'Matrix Type',
            type: 'checkbox',
            content: 'What type of matrices do you apply polynomial functions to? Select all that apply:',
            options: [
              'Hamiltonian matrix',
              'Overlap matrix',
              'Fock matrix',
              'Density matrix',
              'Green\'s function matrix',
              'Time evolution operator',
              'Other (please specify):'
            ]
          }
        ]
      },      
      // Polynomial Types
      {
        id: 'poly-types',
        title: 'Polynomial Types',
        type: 'section',
        children: [
          {
            id: 'poly-basis-type',
            title: 'Polynomial Basis',
            type: 'checkbox',
            content: 'Which polynomial bases do you use? Select all that apply:',
            options: [
              'Chebyshev polynomials',
              'Legendre polynomials',
              'Taylor series',
              'Newton polynomials',
              'McWeeny polynomials',
              'Fermi polynomial approximations',
              'Other (please specify):'
            ]
          },
          {
            id: 'poly-degree',
            title: 'Polynomial Degree',
            type: 'multiple-choice',
            content: 'What is your typical polynomial degree?',
            options: [
              'Low degree (< 10)',
              'Medium degree (10-50)',
              'High degree (50-200)',
              'Very high degree (> 200)',
              'Adaptive/varies by application'
            ]
          }
        ]
      },
      // Accuracy and Convergence
      {
        id: 'poly-accuracy',
        title: 'Accuracy and Convergence',
        type: 'section',
        children: [
          {
            id: 'poly-accuracy-requirements',
            title: 'Accuracy Requirements',
            type: 'multiple-choice',
            content: 'What accuracy do you typically require?',
            options: [
              'Low (10⁻³)',
              'Medium (10⁻⁶)',
              'High (10⁻⁹)',
              'Very high (10⁻¹²)',
              'Varies by application'
            ]
          },
          {
            id: 'poly-convergence-criteria',
            title: 'Convergence Criteria',
            type: 'checkbox',
            content: 'What convergence criteria do you use? Select all that apply:',
            options: [
              'Residual norm',
              'Energy convergence',
              'Density matrix idempotency',
              'Spectral properties',
              'Adaptive criteria',
              'Other (please specify):'
            ]
          }
        ]
      },      
      // Library Usage
      {
        id: 'poly-libraries',
        title: 'Library Usage',
        type: 'section',
        children: [
          {
            id: 'poly-libraries-current',
            title: 'Currently Used Specific Libraries other than BLAS/LAPACK and any general purpose libraries',
            type: 'checkbox',
            content: 'Which libraries do you currently use? Select all that apply:',
            options: [
              'CheSS (Chebyshev Sparse Solvers)',
              'NTPoly',
              'Custom implementation',
              'Other (please specify):'
            ]
          },
          {
            id: 'poly-libraries-interested',
            title: 'Libraries of Interest',
            type: 'checkbox',
            content: 'Which libraries are you interested in using? Select all that apply:',
            options: [
              'CheSS (Chebyshev Sparse Solvers)',
              'NTPoly',
              'Custom implementation',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'sym-herm-input-data-type',
            title: 'Benchmark Input Types',
            type: 'checkbox',
            content: 'What types of matrix inputs should be used for benchmarking?',
            options: [
              'Synthetic / random matrices',
              'Real matrices from application workloads',
              'Both synthetic and real data',
              'Mini-apps or extracted kernels from real applications',
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-data-provision',
            title: 'Can You Provide Data or Mini-apps?',
            type: 'checkbox',
            content: 'Would you be able to share real matrices or mini-apps for benchmarking?',
            options: [
              'Yes, both matrices and mini-apps',
              'Yes, matrices only',
              'Yes, mini-apps only',
              'No',
              'Not sure yet'
            ]
          },
          //{
          //  id: 'gemm-hardware-interest',
          //  title: 'Hardware Interest',
          //  type: 'checkbox',
          //  content: 'Which hardware platforms are you interested in using? Select all that apply:',
          //  options: [
          //    'Integration effort too high',
          //    'Lacks GPU support',
          //    'Lacks parallelism or scalability',
          //    'Unclear documentation or support',
          //    'Incompatible license',
          //    'Not performance-portable (heterogeneous systems)',
          //    'Missing needed precision (e.g., complex/quad/half)',
          //    'Dependency overhead too large',
          //    'Stability or convergence issues in practice',
          //    'Other (please specify):'
          //  ]
          //}
        ]
      },      
    ]
  }
]; 