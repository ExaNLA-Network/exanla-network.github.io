import { SurveySection } from './types';

export const linearSolversData: SurveySection[] = [
  {
    id: 'linear-solvers-section',
    title: 'Linear System Solvers',
    description: 'Details about linear solver usage in your applications.',
    questions: [
      // Matrix Properties
      {
        id: 'linear-solver-matrix',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'matrix-structure',
            title: 'Matrix Structure',
            type: 'checkbox',
            content: 'What structure do your matrices have? Select all that apply:',
            options: [
              'Dense',
              'Sparse',
              'Block sparse',
              'Banded',
              'Block diagonal',
              'Structured (Toeplitz, Hankel, etc.)',
              'Matrix-free (only matrix-vector products available)',
              'Matrix-free with preconditioner',
              'Matrix-free with approximate factorization',
              'Matrix-free with multilevel structure',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-properties',
            title: 'Matrix Properties',
            type: 'checkbox',
            content: 'What properties do your matrices have? Select all that apply:',
            options: [
              'Symmetric/Hermitian',
              'Non-symmetric/Non-Hermitian',
              'Positive definite',
              'Indefinite',
              'Complex-valued',
              'Real-valued',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-distribution',
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
              'Distribution matching preconditioner',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-format',
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
              'Format optimized for matrix-free operations',
              'Format optimized for GPU computation',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-size',
            title: 'Matrix Size',
            type: 'multiple-choice',
            content: 'What is your typical matrix size?',
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
      // Performance Requirements
      {
        id: 'solver-performance',
        title: 'Performance Requirements',
        type: 'section',
        children: [
          {
            id: 'solver-accuracy',
            title: 'Accuracy Requirements',
            type: 'multiple-choice',
            content: 'What accuracy do you typically require?',
            options: [
              'Low (10⁻³)',
              'Medium (10⁻⁶)',
              'High (10⁻⁹)',
              'Very high (10⁻¹²)',
              'Machine precision'
            ]
          },
          {
            id: 'solver-precision-type',
            title: 'Working Precision',
            type: 'checkbox',
            content: 'What numerical precision do you use or need for linear solvers? Select all that apply:',
            options: [
              'Single precision (32-bit)',
              'Double precision (64-bit)',
              'Extended/Quad precision (128-bit)',
              'Mixed precision (e.g., FP32 solver with FP64 refinement)',
              'Low precision (e.g., FP16, BF16)',
              'Adaptive precision (based on matrix condition number)',
              'Precision matching input matrix type',
              'Higher precision for ill-conditioned systems',
              'Mixed precision iterative refinement',
              'Different precision for solver vs. preconditioner'
            ]
          },
          {
            id: 'solver-scaling',
            title: 'Scaling Requirements',
            type: 'multiple-choice',
            content: 'What scaling behavior do you need?',
            options: [
              'Linear O(N)',
              'Near-linear O(N log N)',
              'Quadratic O(N²)',
              'Cubic O(N³)',
              'Not critical'
            ]
          },
          {
            id: 'solver-parallel',
            title: 'Parallelization Requirements',
            type: 'checkbox',
            content: 'Which parallelization features do you need? Select all that apply:',
            options: [
              'Shared memory (OpenMP)',
              'Distributed memory (MPI)',
              'GPU acceleration',
              'Hybrid CPU-GPU',
              'Multi-node scaling',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'solver-workload',
        title: 'Workload Characteristics',
        type: 'section',
        children: [
          {
            id: 'solver-computation-type',
            title: 'Computation Pattern: capability or capacity',
            type: 'checkbox',
            content: 'How do you typically solve linear systems? Select all that apply:',
            options: [
              'Large-scale single systems (e.g., one large system at a time, using significant computational resources)',
              'Many independent smaller systems (e.g., batch processing multiple right-hand sides)',
              'Mix of large and small systems (varying resource requirements)',
              'Repeated solves with same matrix (e.g., multiple right-hand sides)',
              'Repeated solves with similar matrices (e.g., during nonlinear iterations)',
              'Real-time/interactive requirements (need immediate solutions)',
              'Asynchronous/background processing (can wait for solutions)',
              'Part of larger computation (e.g., inner solver in optimization)',
              'Sequence of related systems (e.g., from time-stepping)',
              'Multiple systems in parallel (e.g., domain decomposition)',
              'Incremental updates to existing solutions'
            ]
          }
        ]
      },
      // Library Usage
      {
        id: 'solver-libraries',
        title: 'Library Usage',
        type: 'section',
        children: [
          {
            id: 'dense-solver-libraries',
            title: 'Dense Solver Libraries',
            type: 'checkbox',
            content: 'Which dense solver libraries do you use? Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'cuSolverMp',
              'Other (please specify):'
            ]
          },
          {
            id: 'sparse-solver-libraries',
            title: 'Sparse Solver Libraries',
            type: 'checkbox',
            content: 'Which sparse solver libraries do you use? Select all that apply:',
            options: [
              'PETSc',
              'Trilinos',
              'MUMPS',
              'SuperLU',
              'PARDISO',
              'PEXSI',
              'NTPoly',
              'CheSS',
              'Other (please specify):'
            ]
          },
        ]
      },
      {
        id: 'linear-solvers-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'linear-solvers-input-data-type',
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
            id: 'linear-solvers-data-provision',
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
            id: 'linear-solvers-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for linear system solvers?',
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