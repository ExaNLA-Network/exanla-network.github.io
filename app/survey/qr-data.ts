import { SurveySection } from './types';

export const qrData: SurveySection[] = [
  {
    id: 'qr-factorization',
    title: 'QR Factorization (A = QR)',
    description: 'Details about QR factorization usage in your applications.',
    questions: [    
      // Matrix Properties
      {
        id: 'qr-matrix-structure',
        title: 'Matrix Properties',
        type: 'checkbox',
        content: 'What is the structure and properties of your matrices for QR factorization? Select all that apply:',
        options: [
          'Dense',
          'Sparse',
          'Block Sparse',
          'Banded',
          'Block diagonal',
          'Toeplitz',
          'Hierarchical / Low-rank',
          'Complex valued',
          'Real valued',
          'Other (please specify):'
        ]
      },
      {
        id: 'qr-matrix-distribution',
        title: 'Matrix Distribution',
        type: 'checkbox',
        content: 'How is your matrix distributed across processes/nodes? Select all that apply:',
        options: [
          'Block cyclic distribution (e.g., ScaLAPACK style)',
          'Block row/column distribution',
          'Custom domain decomposition',
          'Hierarchical/multilevel distribution',
          'Communication-minimizing distribution',
          'Replicated on all processes',
          'Hybrid CPU-GPU distribution',
          'Dynamic/adaptive distribution',
          'Tall-skinny optimized distribution',
          'Other (please specify):'
        ]
      },
      {
        id: 'qr-matrix-format',
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
          'Format optimized for Householder operations',
          'Format optimized for GPU computation',
          'Format for tall-skinny matrices',
          'Other (please specify):'
        ]
      },
      {
        id: 'qr-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'qr-condition',
            title: 'Condition Number',
            type: 'multiple-choice',
            content: 'What is the typical condition number of your matrices?',
            options: [
              'Well-conditioned (< 10^3)',
              'Moderately conditioned (10^3 - 10^6)',
              'Ill-conditioned (10^6 - 10^9)',
              'Very ill-conditioned (> 10^9)',
              'Varies significantly'
            ]
          },
          {
            id: 'qr-scale-size',
            title: 'Matrix Dimensions',
            type: 'multiple-choice',
            content: 'What are the typical dimensions of your matrices?',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)'
            ]
          },
          {
            id: 'qr-aspect-ratio',
            title: 'Matrix Shape',
            type: 'multiple-choice',
            content: 'What is the typical shape of your matrices (m rows × n columns)?',
            options: [
              'Square (m = n)',
              'Tall and skinny (m >> n)',
              'Short and wide (m << n)',
              'Nearly square (m ≈ n)',
              'Varies by application'
            ]
          }
        ]
      },
      // Computation Requirements
      {
        id: 'qr-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'qr-compute-mode',
            title: 'What to Compute',
            type: 'checkbox',
            content: 'What do you need to compute? Select all that apply:',
            options: [
              'Q and R factors explicitly',
              'Q factor only',
              'R factor only',
              'QR factorization for least squares',
              'QR with column pivoting',
              'Compact/Economy QR (minimal Q factor)',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-q-handling',
            title: 'Q Factor Handling',
            type: 'multiple-choice',
            content: 'How do you need the Q factor?',
            options: [
              'Explicit Q matrix',
              'Q as Householder reflectors',
              'Q-vector products only',
              'Do not need Q',
              'Varies'
            ]
          }
        ]
      },
      // Accuracy Requirements
      {
        id: 'qr-accuracy',
        title: 'Accuracy Requirements',
        type: 'section',
        children: [
          {
            id: 'qr-orthogonality',
            title: 'Q Orthogonality',
            type: 'multiple-choice',
            content: 'What level of orthogonality do you require for Q (||Q^T Q - I||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'qr-factorization-accuracy',
            title: 'Factorization Accuracy',
            type: 'multiple-choice',
            content: 'What accuracy do you require for the factorization (||A - QR||/||A||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'qr-precision-type',
            title: 'Working Precision',
            type: 'checkbox',
            content: 'What numerical precision do you use or need for QR factorization? Select all that apply:',
            options: [
              'Single precision (32-bit)',
              'Double precision (64-bit)',
              'Extended/Quad precision (128-bit)',
              'Mixed precision (e.g., FP32 factorization with FP64 refinement)',
              'Low precision (e.g., FP16, BF16)',
              'Adaptive precision (based on matrix condition number)',
              'Precision matching input matrix type',
              'Different precision for Q and R factors'
            ]
          }
        ]
      },
      {
        id: 'qr-workload',
        title: 'Workload Characteristics',
        type: 'section',
        children: [
          {
            id: 'qr-computation-type',
            title: 'Computation Pattern: capability or capacity',
            type: 'checkbox',
            content: 'How do you typically perform QR factorizations? Select all that apply:',
            options: [
              'Large-scale single factorizations (e.g., one large matrix at a time, using significant computational resources)',
              'Many independent smaller factorizations (e.g., batch processing multiple matrices simultaneously)',
              'Mix of large and small factorizations (varying resource requirements)',
              'Repeated factorizations of similar matrices (e.g., during iterative methods or optimization)',
              'Real-time/interactive requirements (need immediate factorization)',
              'Asynchronous/background processing (can wait for factorization)',
              'Part of larger computation (e.g., least squares or eigenvalue problems)',
              'Updating/downdating existing factorizations'
            ]
          }
        ]
      },
      // Library Usage - Distributed
      {
        id: 'qr-nla-libraries-distributed',
        title: 'Distributed-Memory Dense Linear Algebra',
        type: 'section',
        children: [
          {
            id: 'qr-nla-group-distributed-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'ELPA',
              'EigenExa',
              'Chameleon',
              'DPLASMA',
              'cuSolverMp',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-nla-group-distributed-interested',
            title: 'Interested in Using',
            type: 'checkbox',
            content: 'Which distributed libraries are you interested in using? Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'ELPA',
              'EigenExa',
              'Chameleon',
              'DPLASMA',
              'cuSolverMp',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Library Usage - Specialized
      {
        id: 'qr-nla-libraries-specialized',
        title: 'Specialized Libraries (Sparse/Structured/Hierarchical)',
        type: 'section',
        children: [
          {
            id: 'qr-nla-group-specialized-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all libraries you use for special matrix structures:',
            options: [
              'SuiteSparseQR (sparse QR)',
              'qr_mumps (parallel sparse QR)',
              'SPQR (SuiteSparse parallel QR)',
              'STRUMPACK (hierarchical matrices)',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-nla-group-specialized-interested',
            title: 'Interested in Using',
            type: 'checkbox',
            content: 'Which specialized libraries are you interested in using? Select all that apply:',
            options: [
              'SuiteSparseQR (sparse QR)',
              'qr_mumps (parallel sparse QR)',
              'SPQR (SuiteSparse parallel QR)',
              'STRUMPACK (hierarchical matrices)',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'qr-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'qr-input-data-type',
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
            id: 'qr-data-provision',
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
            id: 'qr-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for QR factorization?',
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