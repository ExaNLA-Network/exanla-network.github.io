import { SurveySection } from './types';

export const bseData: SurveySection[] = [
  {
    id: 'quasi-hermitian-bse-eigenvalue',
    title: 'Quasi-Hermitian (BSE) Eigenvalue Problems',
    description: 'Details about quasi-Hermitian eigenvalue problems arising from the Bethe-Salpeter Equation (BSE): Hψ = Eψ, where H = (A B; -B* -A*), with A = A† (Hermitian) and B = B^T (symmetric).',
    questions: [
      {
        id: 'bse-matrix-structure',
        title: 'Matrix Properties and Structure',
        type: 'checkbox',
        content: 'What is the structure and properties of your BSE matrices? Select all that apply:',
        options: [
          'Dense (standard full matrix)',
          'Sparse (from localized basis or truncated interactions)',
          'Block sparse (e.g., from locality in A/B blocks)',
          'Banded (if coupling is short-range only',
          'Complex valued',
          'Real valued',
          'Other (please specify):'
        ]
      },
      {
        id: 'bse-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          //{
          //  id: 'bse-condition',
          //  title: 'Condition number',
          //  type: 'multiple-choice',
          //  content: 'What is the typical condition number of your matrices?',
          //  options: [
          //    'Well-conditioned (< 10^3)',
          //    'Moderately conditioned (10^3 - 10^6)',
          //    'Ill-conditioned (10^6 - 10^9)',
          //    'Very ill-conditioned (> 10^9)',
          //    'Varies significantly'
          //  ]
          //},
          {
            id: 'bse-eigenvalue-distribution',
            title: 'Eigenvalue distribution',
            type: 'checkbox',
            content: 'How are the eigenvalues distributed?',
            options: [
              'Well-separated',
              'Clustered',
              'Scattered',
              'Some clustered, some separated',
              'Varies'
            ]
          },
          {
            id: 'bse-scale-size',
            title: 'Matrix scale/size',
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
        id: 'bse-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'bse-eigenvalue-percentage',
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
            id: 'bse-compute-mode',
            title: 'What to compute',
            type: 'multiple-choice',
            content: 'What do you need to compute?',
            options: [
              'Eigenvalues only',
              'All eigenvalues and eigenvectors',
              'Selected eigenvalues and eigenvectors',
              'Varies'
            ]
          },
          {
            id: 'bse-eigenvalue-location',
            title: 'Eigenvalue location',
            type: 'multiple-choice',
            content: 'Which eigenvalues are most important to you?',
            options: [
              'Largest eigenvalues (top)',
              'Smallest eigenvalues (bottom)',
              'Eigenvalues near a specific value',
              'Eigenvalues in a specific range',
              'Interior eigenvalues',
              'All eigenvalues',
              'Varies'
            ]
          }
        ]
      },
      {
        id: 'bse-tolerance',
        title: 'Required tolerance/precision',
        type: 'section',
        children: [
          {
            id: 'bse-residual-type',
            title: 'Residual tolerance type',
            type: 'multiple-choice',
            content: 'What type of residual tolerance do you use?',
            options: [
              'Absolute residual (||Ax - λx||)',
              'Relative residual (||Ax - λx|| / ||Ax||)',
              'Both absolute and relative',
              'Hybrid (combination of absolute and relative)',
              'Other (please specify):'
            ]
          },
          {
            id: 'bse-absolute-residual-tolerance',
            title: 'Absolute residual tolerance',
            type: 'multiple-choice',
            content: 'What absolute residual tolerance do you require for ||Ax - λx||?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ],
            showOnlyWhenParentSelected: true
          },
          {
            id: 'bse-relative-residual-tolerance',
            title: 'Relative residual tolerance',
            type: 'multiple-choice',
            content: 'What relative residual tolerance do you require for ||Ax - λx|| / ||Ax||?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ],
            showOnlyWhenParentSelected: true
          },
          {
            id: 'bse-hybrid-residual-tolerance',
            title: 'Hybrid residual tolerance',
            type: 'textarea',
            content: 'Please describe your hybrid residual tolerance criteria (e.g., "||Ax - λx|| < max(10^-6, 10^-8 * ||Ax||)" or "convergence when either absolute < 10^-9 OR relative < 10^-6")',
            showOnlyWhenParentSelected: true
          },
          {
            id: 'bse-orthogonality-tolerance',
            title: 'Orthogonality tolerance',
            type: 'multiple-choice',
            content: 'What orthogonality tolerance do you require for eigenvectors?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'bse-precision-type',
            title: 'Working Precision',
            type: 'checkbox',
            content: 'What numerical precision do you use or need? Select all that apply:',
            options: [
              'Single precision (32-bit)',
              'Double precision (64-bit)',
              'Extended/Quad precision (128-bit)',
              'Mixed precision (e.g., FP32/FP64 combination)',
              'Low precision (e.g., FP16, BF16)',
              'Adaptive precision'
            ]
          }
        ]
      },
      {
        id: 'bse-workload',
        title: 'Workload Characteristics',
        type: 'section',
        children: [
          {
            id: 'bse-computation-type',
            title: 'Computation Pattern: capability or capacity',
            type: 'checkbox',
            content: 'How do you typically run your BSE eigenvalue computations? Select all that apply:',
            options: [
              'Large-scale single problems (e.g., one large BSE matrix at a time, using significant computational resources)',
              'Many independent smaller problems (e.g., batch processing multiple BSE matrices simultaneously)',
              'Mix of large and small problems (varying resource requirements)',
              'Repeated similar-sized problems (e.g., time evolution or parameter sweeps)',
              'Real-time/interactive requirements (need immediate solutions)',
              'Asynchronous/background processing (can wait for solutions)'
            ]
          }
        ]
      },
      {
        id: 'bse-nla-library-usage',
        title: 'Distributed-Memory NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'bse-nla-general-nonhermitian',
            title: 'General Non-Hermitian Eigensolvers',
            type: 'checkbox',
            content: 'Using general non-Hermitian eigensolvers targeting BSE problems. Select all that apply:',
            options: [
              'ARPACK – Classic iterative solver using shift-invert',
              'PRIMME – High-performance iterative eigensolvers',
              'Anasazi (Trilinos) – Block Davidson and Krylov methods',
              'ScaLAPACK – Distributed dense eigensolvers (geev)',
              'SLATE – Successor to ScaLAPACK, CPU/GPU asynchronous support',
              'StarNEig – Scalable Task-based Algorithmic Research for non-Hermitian Eigenvalue Problems',
              'FEAST – rational filter for non-Hermitian eigenvalue problems',
              'Other (please specify):'
            ]
          },
          {
            id: 'bse-nla-bse-specific',
            title: 'Solvers Targeting Full BSE Problems',
            type: 'checkbox',
            content: 'Specialized or commonly adopted libraries optimized or widely used for full Bethe-Salpeter Equation eigenproblems. Select all that apply:',
            options: [
              'BSEPACK – Dedicated solver library for full BSE eigenproblems',
              'ChASE – Chebyshev Accelerated Subspace Eigensolver, extended to BSE with custmoized filters and rayleigh-ritz',
              'ELPA – extended to BSE (experimental?)',
              'SLEPc – thick-restart Lanczos targeting BSE',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'bse-interested-libraries',
        title: 'Are there any NLA libraries you are interested in using (but have not yet adopted)?',
        type: 'checkbox',
        content: 'Select all that apply:',
        options: [
          'ARPACK',
          'PRIMME',
          'Anasazi',
          'ScaLAPACK',
          'SLATE',
          'StarNEig',
          'FEAST',
          'BSEPACK',
          'ChASE',
          'ELPA',
          'SLEPc',
          'Other (please specify):'
        ]
      },
      {
        id: 'bse-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'bse-input-data-type',
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
            id: 'bse-data-provision',
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
          {
            id: 'bse-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for BSE eigenproblems?',
            options: [
              'Strong scaling (fixed total problem size)',
              'Weak scaling (fixed problem size per process/node)',
              'Both strong and weak scaling needed',
              'No specific scaling requirements'
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