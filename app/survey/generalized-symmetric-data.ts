import { SurveySection } from './types';

export const generalizedSymmetricData: SurveySection[] = [
  {
    id: 'generalized-symmetric-eigenvalue',
    title: 'Generalized Symmetric Eigenvalue Problems',
    description: 'Details about generalized symmetric (Hermitian) eigenvalue problems of the form A x = λ B x, where B is symmetric positive definite (SPD) or Hermitian positive definite (HPD).',
    questions: [
      {
        id: 'gen-sym-matrix-structure',
        title: 'Matrix Structure',
        type: 'checkbox',
        content: 'What is the structure of your A and B matrices? (Select all that apply)',
        options: [
          'A is dense, B is dense',
          'A is sparse, B is sparse',
          'A is dense, B is sparse',
          'A is banded, B is banded',
          'A is block-structured, B is block-structured',
          'Other (please specify):'
        ]
      },
      {
        id: 'gen-sym-b-numerical-properties',
        title: 'Reduction to Standard Eigenproblem (using B)',
        type: 'section',
        children: [
          {
            id: 'gen-sym-reduction-needed',
            title: 'Reduction to Standard Eigenproblem',
            type: 'multiple-choice',
            content: 'Do you reduce the generalized problem to a standard eigenproblem using B’s factorization or inversion?',
            options: [
              'Yes, always',
              'Yes, sometimes (depends on solver or problem)',
              'No, solver works directly with generalized form (e.g., contour integration, FEAST, iterative solvers)',
              'Don\'t know / Not applicable'
            ]
          },
          {
            id: 'gen-sym-reduction-method',
            title: 'Reduction Method',
            type: 'multiple-choice',
            content: 'If you perform reduction of the generalized eigenproblem, which method do you use?',
            options: [
              'Cholesky factorization of B (B = LLᵗ or B = L*L)',
              'Approximate inverse of B (e.g., polynomial or iterative approximation)',
              'Other direct factorizations',
              'Not applicable / No reduction'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          //{
          //  id: 'sym-herm-diagonal-dominance',
          //  title: 'Diagonal dominance',
          //  type: 'multiple-choice',
          //  content: 'What best describes the diagonal dominance?',
          //  options: [
          //    'Strictly diagonally dominant',
          //    'Weakly diagonally dominant',
          //    'Not diagonally dominant',
          //    'Varies'
          //  ]
          //},
          //{
          //  id: 'sym-herm-condition',
          //  title: 'Condition number',
          //  type: 'multiple-choice',
          //  content: 'How well-conditioned are your matrices (approximate condition number)?',
          //  options: [
          //    'Well-conditioned (< 10^3)',
          //    'Moderately conditioned (10^3 - 10^6)',
          //    'Ill-conditioned (10^6 - 10^9)',
          //    'Very ill-conditioned (> 10^9)',
          //    'Varies significantly'
          //  ]
          //},
          {
            id: 'sym-herm-eigenvalue-distribution',
            title: 'Eigenvalue distribution',
            type: 'multiple-choice',
            content: 'How are your eigenvalues typically distributed?',
            options: [
              'Well-separated',
              'Clustered',
              'Mix of clustered and separated',
              'Scattered/unpredictable',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-scale-size',
            title: 'Problem Scale',
            type: 'multiple-choice',
            content: 'What are the typical dimensions of your matrices?',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'sym-herm-eigenvalue-percentage',
            title: 'Percentage of eigenvalues',
            type: 'multiple-choice',
            content: 'What percentage of eigenvalues do you typically compute?',
            options: [
              'Less than 1%',
              '1-10%',
              '10-50%',
              '50-90%',
              '90-100%',
              'All eigenvalues',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-compute-mode',
            title: 'What to compute',
            type: 'multiple-choice',
            content: 'What do you typically need to compute?',
            options: [
              'Eigenvalues only',
              'Eigenvalues and eigenvectors',
              'Selected eigenvalues and eigenvectors',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-eigenvalue-location',
            title: 'Eigenvalue location',
            type: 'multiple-choice',
            content: 'Which eigenvalues are most important to you?',
            options: [
              'Smallest eigenvalues',
              'Largest eigenvalues',
              'Eigenvalues near a target shif',
              'Eigenvalues in a specific range',
              'Interior eigenvalues',
              'All eigenvalues',
              'Varies'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-tolerance',
        title: 'Required tolerance/precision',
        type: 'section',
        children: [
          {
            id: 'sym-herm-residual-tolerance',
            title: 'Residual tolerance',
            type: 'multiple-choice',
            content: 'What residual tolerance do you require for ||Ax - λx||?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'sym-herm-orthogonality-tolerance',
            title: 'Orthogonality tolerance',
            type: 'multiple-choice',
            content: 'What orthogonality tolerance do you require for eigenvectors?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ]
          }
        ]
      },      
      {
        id: 'gen-sym-nla-libraries',
        title: 'Distributed-Memory NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'gen-sym-nla-distributed-dense',
            title: 'Distributed-Memory Dense Linear Algebra',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ScaLAPACK',
              'ELPA',
              'EigenExa',
              'DLA-Future',
              'SLATE',
              'Chameleon',
              'DPLASMA',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-nla-iterative',
            title: 'Iterative Eigensolvers',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ARPACK – Shift-invert methods for symmetric eigenproblems',
              'SLEPc – Scalable iterative eigensolvers built on PETSc',
              'PRIMME – High-performance iterative solvers (e.g., Davidson, JDQMR)',
              'Anasazi – Part of Trilinos, supports block Davidson and Krylov methods',
              'ChASE – Chebyshev accelerated subspace iteration',
              'FEAST – Rational filter for non-Hermitian eigenvalue problems',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-nla-highlevel',
            title: 'High-Level & Interface Libraries',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ELSI – Abstraction layer for eigenvalue solvers (e.g., used by SIESTA, FHI-aims)',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-interested-libraries',
            title: 'Are there any NLA libraries you are interested in using (but have not yet adopted)?',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ScaLAPACK',
              'ELPA',
              'EigenExa',
              'DLA-Future',
              'SLATE',
              'Chameleon',
              'DPLASMA',
              'ARPACK',
              'SLEPc',
              'PRIMME',
              'Anasazi',
              'ChASE',
              'FEAST',
              'ELSI',
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