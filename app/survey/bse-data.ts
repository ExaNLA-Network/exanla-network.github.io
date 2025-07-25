import { SurveySection } from './types';

export const bseData: SurveySection[] = [
  {
    id: 'quasi-hermitian-bse-eigenvalue',
    title: 'Quasi-Hermitian (BSE) Eigenvalue Problems',
    description: 'Details about quasi-Hermitian eigenvalue problems arising from the Bethe-Salpeter Equation (BSE): Hψ = Eψ, where H = (A -B*; B -A*), with A = A† (Hermitian) and B = B^T (symmetric).',
    questions: [
      {
        id: 'bse-matrix-structure',
        title: 'Matrix Structure',
        type: 'checkbox',
        content: 'What is the structure of your BSE matrices? Select all that apply:',
        options: [
          'Dense (standard full matrix)',
          'Sparse (from localized basis or truncated interactions)',
          'Block sparse (e.g., from locality in A/B blocks)',
          'Banded (if coupling is short-range only',
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
            type: 'multiple-choice',
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
            id: 'bse-residual-tolerance',
            title: 'Residual tolerance',
            type: 'multiple-choice',
            content: 'What residual tolerance do you require for ||Ax - λx||?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
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