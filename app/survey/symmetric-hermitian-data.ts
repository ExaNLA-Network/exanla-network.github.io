import { SurveySection } from './types';

export const symmetricHermitianData: SurveySection[] = [
  {
    id: 'symmetric-hermitian-eigenvalue',
    title: 'Symmetric/Hermitian Eigenvalue Problems',
    description: 'Details about symmetric/Hermitian eigenvalue problems in your library.',
    questions: [
      {
        id: 'sym-herm-physical-problem',
        title: 'Primary Use Cases',
        type: 'checkbox',
        content: 'What is the physical problem linked to the eigenvalue problem?',
        options: [
            'Kohn–Sham equations (standard DFT)',
            'GW quasiparticle calculations',
            'Bethe–Salpeter equation (Tamm-Dancoff approximation)',
            'Tight-binding models',
            'Other (please specify):'
        ]
      },
      {
        id: 'sym-herm-matrix-structure',
        title: 'Matrix Properties and Structure',
        type: 'checkbox',
        content: 'What is the structure and properties of your symmetric/Hermitian matrices? Select all that apply:',
        options: [
          'Dense',
          'Sparse',
          'Block Sparse',
          'Tridiagonal/Banded',
          'Block tridiagonal/Block Diagonal',
          'Toeplitz',
          'Matrix-free (only matrix-vector products available)',
          'Matrix-free with preconditioner',
          'Complex valued',
          'Real valued',
          'Other (please specify):'
        ]
      },
      {
        id: 'sym-herm-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'sym-herm-matrix-distribution',
            title: 'Matrix Distribution',
            type: 'checkbox',
            content: 'How is your matrix distributed across processes/nodes? Select all that apply:',
            options: [
              'Block cyclic distribution (e.g., ScaLAPACK style)',
              'Block row/column distribution',
              'Custom domain decomposition',
              'Hierarchical/multilevel distribution',
              'Graph/hypergraph partitioning',
              'Replicated on all processes',
              'Hybrid CPU-GPU distribution',
              'Dynamic/adaptive distribution',
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-matrix-format',
            title: 'Matrix Storage Format',
            type: 'checkbox',
            content: 'What storage formats do you use? Select all that apply:',
            options: [
              'Dense (column-major/row-major)',
              'Compressed Sparse Row (CSR/CRS)',
              'Compressed Sparse Column (CSC/CCS)',
              'Block CSR/CSC',
              'ELLPACK/ELLPACK-R',
              'Diagonal/Block-diagonal',
              'Coordinate (COO)',
              'Hierarchical formats (H-matrices, HSS)',
              'Custom/application-specific format',
              'Multiple formats (conversion as needed)',
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-spd',
            title: 'Positive definiteness',
            type: 'multiple-choice',
            content: 'Is your matrix positive definite?',
            options: [
              'Always positive definite',
              'Usually positive definite',
              'Not positive definite',
              'Varies depending on the problem'
            ]
          },
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
            type: 'checkbox',
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
            type: 'checkbox',
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
              'Eigenvalues near a target shift',
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
            id: 'sym-herm-residual-type',
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
            id: 'sym-herm-absolute-residual-tolerance',
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
            id: 'sym-herm-relative-residual-tolerance',
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
            id: 'sym-herm-hybrid-residual-tolerance',
            title: 'Hybrid residual tolerance',
            type: 'textarea',
            content: 'Please describe your hybrid residual tolerance criteria (e.g., "||Ax - λx|| < max(10^-6, 10^-8 * ||Ax||)" or "convergence when either absolute < 10^-9 OR relative < 10^-6")',
            showOnlyWhenParentSelected: true
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
          },
          {
            id: 'sym-herm-precision-type',
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
        id: 'sym-herm-workload',
        title: 'Workload Characteristics',
        type: 'section',
        children: [
          {
            id: 'sym-herm-computation-type',
            title: 'Computation Pattern: capability or capacity',
            type: 'checkbox',
            content: 'How do you typically run your eigenvalue computations? Select all that apply:',
            options: [
              'Large-scale single problems (e.g., one large matrix at a time, using significant computational resources)',
              'Many independent smaller problems (e.g., batch processing multiple matrices simultaneously)',
              'Mix of large and small problems (varying resource requirements)',
              'Repeated similar-sized problems (e.g., time evolution or parameter sweeps)',
              'Real-time/interactive requirements (need immediate solutions)',
              'Asynchronous/background processing (can wait for solutions)'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-nla-libraries-hierarchical',
        title: 'Distributed-Memory NLA Library Usage',
        type: 'section',
        children: [
          //{
          //  id: 'sym-herm-nla-group-standard',
          //  title: 'Standard Dense Linear Algebra (CPU/GPU/Shared-Memory)',
          //  type: 'checkbox',
          //  content: 'Select all that apply:',
          //  options: [
          //    'LAPACK (including all variants: Netlib, oneMKL, commercial, open-source, etc.)',
          //    'MAGMA – GPU-accelerated dense linear algebra',
          //    'cuSOLVER / cuBLAS – NVIDIA libraries for GPU-based solvers',
          //    'rocSOLVER / rocBLAS – AMD GPU-accelerated dense linear algebra',
          //    'Other (please specify):'
          //  ]
          //},
          {
            id: 'sym-herm-nla-group-distributed',
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
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-nla-group-iterative',
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
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-nla-group-highlevel',
            title: 'High-Level & Interface Libraries',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ELSI – Abstraction layer for eigenvalue solvers',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-interested-libraries',
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
          {
            id: 'sym-herm-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for symmetric/Hermitian eigenvalue problems?',
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
      //{
      //  id: 'sym-herm-barriers-to-adoption',
      //  title: 'If not using libraries of interest, what are the barriers to adoption?',
      //  type: 'checkbox',
      //  content: 'Select all that apply:',
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
  }
]; 