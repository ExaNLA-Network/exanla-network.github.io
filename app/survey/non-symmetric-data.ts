import { SurveySection } from './types';

export const nonSymmetricData: SurveySection[] = [
  {
    id: 'non-symmetric-eigenvalue',
    title: 'Non-Symmetric Eigenvalue Problems',
    description: 'Details about non-symmetric eigenvalue problems in your library.',
    questions: [
      {
        id: 'non-sym-physical-applications',
        title: 'Physical Problems and Applications',
        type: 'checkbox',
        content: 'Which of the following physical problems or applications involve the non-Hermitian matrices you work with? (Select all that apply)',
        options: [
          'Electronic structure calculations beyond Hermitian approximations (e.g., full Bethe-Salpeter Equation)',
          'Non-equilibrium quantum transport (NEGF methods)',
          'Non-Hermitian photonics and optics (e.g., PT-symmetric systems)',
          'Quantum chemistry excited-state methods involving complex Hamiltonians',
          'Other (please specify):'
        ]
      },      
      {
        id: 'non-sym-matrix-properties',
        title: 'Matrix Properties Relevant for Numerical Stability & Iterative Solvers',
        type: 'section',
        children: [
          {
            id: 'non-sym-matrix-structure',
            title: 'Matrix Structure',
            type: 'checkbox',
            content: 'What is the structure of your non-symmetric matrices? Select all that apply:',
            options: [
              'Dense',
              'Sparse',
              'Block sparse',
              'Banded',
              'Block diagonal',
              'Toeplitz',
              'Matrix-free (only matrix-vector products available)',
              'Matrix-free with preconditioner',
              'Complex valued',
              'Real valued',
              'Other (please specify):'
            ]
          },
          {
            id: 'non-sym-matrix-distribution',
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
            id: 'non-sym-matrix-format',
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
              'Format optimized for matrix-vector products',
              'Format optimized for GPU computation',
              'Other (please specify):'
            ]
          },
          {
            id: 'non-sym-normality',
            title: 'Normality',
            type: 'multiple-choice',
            content: 'How would you characterize the normality of your matrix A?',
            options: [
              'Normal (AA† = A†A)',
              'Slightly non-normal',
              'Moderately non-normal',
              'Highly non-normal (far from normal)',
              'Don\'t know / Not applicable'
            ]
          },
          //{
          //  id: 'non-sym-condition',
          //  title: 'Matrix Condition Number',
          //  type: 'multiple-choice',
          //  content: 'What is the typical condition number of your matrix A?',
          //  options: [
          //    'Well-conditioned (< 10^3)',
          //    'Moderately conditioned (10^3 - 10^6)',
          //    'Ill-conditioned (10^6 - 10^9)',
          //    'Very ill-conditioned (> 10^9)',
          //    'Varies widely / Unknown'
          //  ]
          //},
          //{
          //  id: 'non-sym-eigenvector-conditioning',
          //  title: 'Eigenvector Conditioning',
          //  type: 'multiple-choice',
          //  content: 'How well-conditioned are the eigenvectors of your matrix?',
          //  options: [
          //    'Well-conditioned (orthogonal or close to orthogonal)',
          //    'Moderately conditioned',
          //    'Poorly conditioned (close to defective)',
          //    'Highly ill-conditioned or nearly defective',
          //    'Unknown / Not applicable'
          //  ]
          //},
          {
            id: 'non-sym-eigenvalue-distribution',
            title: 'Spectral Radius and Eigenvalue Distribution',
            type: 'multiple-choice',
            content: 'How are the eigenvalues of your matrix distributed?',
            options: [
              'Well-separated',
              'Clustered',
              'Mixed (some clustered, some separated)',
              'Spread across a wide range with no clear pattern',
              'Unknown / Not applicable'
            ]
          },
          //{
          //  id: 'non-sym-defectiveness',
          //  title: 'Defectiveness',
          //  type: 'multiple-choice',
          //  content: 'Does your matrix exhibit defective eigenvalues (non-diagonalizable blocks)?',
          //  options: [
          //    'No, matrix is diagonalizable',
          //    'Occasionally, some eigenvalues are defective',
          //    'Frequently, many eigenvalues are defective',
          //    'Unknown / Not applicable'
          //  ]
          //},
          //{
          //  id: 'non-sym-pseudospectra-sensitivity',
          //  title: 'Pseudospectra Sensitivity',
          //  type: 'multiple-choice',
          //  content: 'How sensitive are your matrix eigenvalues to perturbations (pseudospectral behavior)?',
          //  options: [
          //    'Low sensitivity (stable eigenvalues)',
          //    'Moderate sensitivity',
          //    'High sensitivity (eigenvalues highly sensitive to small perturbations)',
          //    'Unknown / Not applicable'
          //  ]
          //},
        ]
      },
      {
        id: 'non-sym-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'non-sym-eigenvalue-percentage',
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
            id: 'non-sym-compute-mode',
            title: 'What to compute',
            type: 'multiple-choice',
            content: 'What do you need to compute?',
            options: [
              'Eigenvalues only',
              'Eigenvalues and eigenvectors',
              'Eigenvalues and selected eigenvectors',
              'Varies'
            ]
          },
          {
            id: 'non-sym-eigenvalue-location',
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
        id: 'non-sym-tolerance',
        title: 'Required tolerance/precision',
        type: 'section',
        children: [
          {
            id: 'non-sym-residual-tolerance',
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
            id: 'non-sym-orthogonality-tolerance',
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
            id: 'non-sym-precision-type',
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
        id: 'non-sym-workload',
        title: 'Workload Characteristics',
        type: 'section',
        children: [
          {
            id: 'non-sym-computation-type',
            title: 'Computation Pattern: capability or capacity',
            type: 'checkbox',
            content: 'How do you typically run your non-symmetric eigenvalue computations? Select all that apply:',
            options: [
              'Large-scale single problems (e.g., one large non-symmetric matrix at a time, using significant computational resources)',
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
        id: 'non-sym-nla-libraries',
        title: 'Distributed-Memory NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'non-sym-nla-general-nonhermitian',
            title: 'General Non-Hermitian Eigensolvers',
            type: 'checkbox',
            content: 'Used for a wide range of general eigenproblems including non-Hermitian, complex matrices. Select all that apply:',
            options: [
              'ARPACK – Classic iterative solver using shift-invert',
              'PRIMME – High-performance iterative eigensolvers',
              'SLEPc – Scalable iterative eigensolvers built on PETSc',
              'Anasazi (Trilinos) – Block Davidson and Krylov methods',
              'ScaLAPACK – Distributed dense eigensolvers',
              'SLATE – Successor to ScaLAPACK, CPU/GPU asynchronous support',
              'StarNEig – Scalable Task-based Algorithmic Research for non-Hermitian Eigenvalue Problems',
              'FEAST – rational filter for non-Hermitian eigenvalue problems',
              'Other (please specify):'
            ]
          },
          {
            id: 'non-sym-interested-libraries',
            title: 'Are there any NLA libraries you are interested in using (but have not yet adopted)?',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ARPACK',
              'PRIMME',
              'SLEPc',
              'Anasazi',
              'ScaLAPACK',
              'SLATE',   
              'StarNEig',
              'FEAST',
              'Other (please specify):'
            ]
          }                   
        ]
      },
      {
        id: 'non-sym-herm-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'non-sym-input-data-type',
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
            id: 'non-sym-data-provision',
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
            id: 'non-sym-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for non-symmetric eigenproblems?',
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