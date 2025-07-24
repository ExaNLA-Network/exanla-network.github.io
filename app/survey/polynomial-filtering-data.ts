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
          },
          {
            id: 'poly-specific-methods',
            title: 'Specific Methods',
            type: 'checkbox',
            content: 'Which specific methods do you use? Select all that apply:',
            options: [
              'Chebyshev Filtered Subspace Iteration (CheFSI)',
              'Polynomial filtered Lanczos',
              'McWeeny purification',
              'Fermi-Dirac expansion',
              'Real-time propagation',
              'Rational approximation',
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
          },
          {
            id: 'poly-matrix-properties',
            title: 'Matrix Properties',
            type: 'checkbox',
            content: 'What properties do your matrices have? Select all that apply:',
            options: [
              'Hermitian/Symmetric',
              'Sparse',
              'Block-sparse',
              'Time-dependent',
              'Energy/frequency dependent',
              'Temperature dependent',
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
      // Implementation Details
      {
        id: 'poly-implementation',
        title: 'Implementation Details',
        type: 'section',
        children: [
          {
            id: 'poly-evaluation-method',
            title: 'Evaluation Method',
            type: 'checkbox',
            content: 'How do you evaluate the polynomial? Select all that apply:',
            options: [
              'Matrix-vector products',
              'Matrix-matrix products',
              'Sparse matrix operations',
              'Three-term recurrence',
              'Recursive polynomial expansion',
              'Adaptive degree selection',
              'Other (please specify):'
            ]
          },
          {
            id: 'poly-optimization',
            title: 'Optimization Techniques',
            type: 'checkbox',
            content: 'Which optimization techniques do you use? Select all that apply:',
            options: [
              'Sparsity exploitation',
              'Matrix-free operations',
              'Batched operations',
              'GPU acceleration',
              'Mixed precision computation',
              'Distributed computation',
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
              'BigDFT polynomial routines',
              'CP2K polynomial routines',
              'SIESTA polynomial routines',
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
              'BigDFT polynomial routines',
              'CP2K polynomial routines',
              'SIESTA polynomial routines',
              'Other (please specify):'
            ]
          }
        ]
      }
    ]
  }
]; 