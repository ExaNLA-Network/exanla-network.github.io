import { SurveySection } from './types';

export const matrixMultiplicationData: SurveySection[] = [
  {
    id: 'matrix-multiplication-section',
    title: 'Matrix-Matrix Multiplication',
    description: 'Details about matrix-matrix multiplication operations in your applications.',
    questions: [
      // Application Context
      //{
      //  id: 'gemm-context',
      //  title: 'Primary Use Cases',
      //  type: 'checkbox',
      //  content: 'What are your main uses for matrix-matrix multiplication? Select all that apply:',
      //  options: [
      //    'Hamiltonian application to wavefunctions (Hψ)',
      //    'Orthonormalization (Gram-Schmidt, Löwdin)',
      //    'Wavefunction projection (Ψ†SΨ)',
      //    'Subspace projection (V†HV)',
      //    'Density matrix construction (CfC†)',
      //    'Wavefunction updates/rotations',
      //    'Wannier function construction',
      //    'Kohn-Sham matrix updates',
      //    'Green\'s function calculations',
      //    'Tensor contractions in quantum chemistry',
      //    'Other (please specify):'
      //  ]
      //},
      // Matrix Properties
      {
        id: 'gemm-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'gemm-matrix-structure',
            title: 'Matrix Structure',
            type: 'checkbox',
            content: 'What is the structure/type of the matrices you multiply? Select all that apply:',
            options: [
              'Dense matrices',
              'Sparse matrices',
              'Block-structured matrices',
              'Banded matrices',
              'Triangular matrices',
              'Tall-and-skinny matrices',
              'Small batched matrices',
              'Distributed matrices',
              'Mixed real/complex',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-matrix-distribution',
            title: 'Matrix Distribution',
            type: 'checkbox',
            content: 'How are your matrices distributed across processes/nodes? Select all that apply:',
            options: [
              'Block cyclic distribution (e.g., ScaLAPACK style)',
              'Block row/column distribution',
              'Custom domain decomposition',
              'Hierarchical/multilevel distribution',
              'Communication-avoiding distribution',
              'Replicated on all processes',
              'Hybrid CPU-GPU distribution',
              'Dynamic/adaptive distribution',
              'Cannon/SUMMA-style distribution',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-matrix-format',
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
              'Format optimized for batched operations',
              'Format optimized for GPU computation',
              'Format optimized for tensor operations',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-operation-types',
            title: 'Which types of matrix multiplications do you perform?',
            type: 'checkbox',
            content: 'Check all that apply:',
            options: [
              'Standard multiplication (AB)',
              'Scaled multiplication (αAB)',
              'Accumulation (AB + C)',
              'Full GEMM (αAB + βC)',
              'Transpose multiplication (AᵀB, ABᵀ)',
              'Hermitian multiplication (A†B, AB†)',
              'Triple product (ABC)',
              'Batched multiplications',
              'Mixed precision operations',
              'Other (please specify):'
            ]
          },         
          {
            id: 'gemm-dimensions',
            title: 'Typical Dimensions',
            type: 'section',
            children: [
              {
                id: 'gemm-matrix-size',
                title: 'Matrix Size Range',
                type: 'checkbox',
                content: 'What are your typical matrix dimensions?',
                options: [
                  'Small (< 100)',
                  'Medium (100 - 1,000)',
                  'Large (1,000 - 10,000)',
                  'Very Large (10,000 - 100,000)',
                  'Extreme (> 100,000)'
                ]
              },
              {
                id: 'gemm-batch-size',
                title: 'Batch Size',
                type: 'checkbox',
                content: 'For batched operations, what is your typical batch size?',
                options: [
                  'Small (< 10)',
                  'Medium (10 - 100)',
                  'Large (100 - 1,000)',
                  'Very Large (> 1,000)',
                  'Not applicable'
                ]
              }
            ]
          }
        ]
      },
      // Performance Requirements
      //{
      //  id: 'gemm-performance',
      //  title: 'Performance Requirements',
      //  type: 'section',
      //  children: [
      //  {
      //    id: 'gemm-computation-frequency',
      //    title: 'Computation Frequency',
      //    type: 'multiple-choice',
      //    content: 'How frequently do you perform matrix multiplications?',
      //    options: [
      //      'Once per simulation step',
      //      'Multiple times per SCF iteration',
      //      'Thousands of times per simulation',
      //      'Real-time/Dynamic updates',
      //      'Varies by application'
      //    ]
      //    },
      //  {
      //    id: 'gemm-performance-critical',
      //    title: 'Performance Criticality',
      //    type: 'multiple-choice',
      //    content: 'How critical is GEMM performance to your application?',
      //    options: [
      //      'Dominant performance bottleneck',
      //      'Major performance factor',
      //      'Moderate impact',
      //      'Minor impact',
      //      'Not performance critical'
      //    ]
      //  }//,
          //{
          //  id: 'gemm-optimization-techniques',
          //  title: 'Optimization Techniques',
          //  type: 'checkbox',
          //  content: 'Which optimization techniques do you use? Select all that apply:',
          //  options: [
          //    'Batching small operations',
          //    'Fusing multiple operations',
          //    'Mixed precision computation',
          //    'Memory layout optimization',
          //    'Algorithm-specific optimizations',
          //    'Hardware-specific tuning',
          //    'Auto-tuning',
          //    'Other (please specify)'
          //  ]
          //}
      //  ]
      //},
      // Implementation Details
      {
        id: 'gemm-implementation',
        title: 'Distributed-Memory NLA Library Usage',
        type: 'section',
        children: [
          //{
          //  id: 'gemm-libraries-shared',
          //  title: 'Shared Memory Libraries (CPU/GPU)',
          //  type: 'checkbox',
          //  content: 'Which shared memory libraries do you use for matrix-matrix multiplication? Select all that apply:',
          //  options: [
          //    'BLAS (all variants: OpenBLAS, MKL, AOCL, BLIS, ATLAS, Netlib, etc.)',
          //    'SuiteSparse',
          //    'cuBLAS (NVIDIA GPU)',
          //    'cuSPARSE (NVIDIA GPU, sparse)',
          //    'rocBLAS (AMD GPU)',
          //    'rocSPARSE (AMD GPU, sparse)',
          //    'oneMKL (Intel, cross-architecture)',
          //    'MAGMA (CPU/GPU hybrid)',
          //    'CUTLASS (NVIDIA GPU)',
          //    'cuBLASMG (NVIDIA multi-GPUs)',
          //    'Eigen',
          //    'Tpetra (Trilinos)',
          //    'Custom implementation',
          //    'Other (please specify):'
          //  ]
          //},
          {
            id: 'gemm-libraries-distributed',
            title: 'General Distributed Memory Libraries (CPU/GPU)',
            type: 'checkbox',
            content: 'Which general distributed memory libraries do you use for matrix-matrix multiplication? Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'COSMA',
              'DPLASMA',
              'Elemental',
              'ELPA',
              'cuBLASMp (NVIDIA distributed-memory GPUs)',
              'PETSc',
              'Tpetra (Trilinos)',
              'DASK',
              'Custom distributed implementation',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-special-implementations',
            title: 'Special/Advanced Implementations',
            type: 'checkbox',
            content: 'Which special or advanced matrix-matrix multiplication implementations do you use? Select all that apply:',
            options: [
              'Tensor contraction engines',
              'Block-sparse or block-structured multiplication',
              'Mixed-precision implementations (e.g., using FP16/FP32/FP64 in the same operation)',
              'Fused operations (e.g., GEMM + bias, GEMM + activation, or custom fused kernels)',
              'Algorithm-specific implementations (e.g., Strassen, communication-avoiding algorithms)',
              'Auto-tuned or code-generated kernels',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-interested-libraries',
            title: 'Are there any NLA libraries you are interested in using (but have not yet adopted)?',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'COSMA',
              'DPLASMA',
              'Elemental',
              'ELPA',
              'cuBLASMp (NVIDIA distributed-memory GPUs)',
              'PETSc',
              'Tpetra (Trilinos)',
              'DASK',
              'Other (please specify):'
            ]
          },
          //{
          //  id: 'gemm-barriers-to-adoption',
          //  title: 'If not using libraries of interest, what are the barriers to adoption?',
          //  type: 'checkbox',
          //  content: 'Select all that apply:',
          //  options: [
          //    'Performance',
          //    'Portability',
          //    'Scalability',
          //    'Ease of use',
          //    'Other (please specify):'
          //  ]
          //}
        ]
      },
      // Future Requirements
      {
        id: 'gemm-future',
        title: 'Future Requirements',
        type: 'section',
        children: [
          {
            id: 'gemm-future-features',
            title: 'Desired Features',
            type: 'checkbox',
            content: 'What features would be useful for your applications? Select all that apply:',
            options: [
              'Better mixed precision support',
              'More efficient batched operations',
              'Improved sparse-dense multiplication',
              'Better tensor contraction support',
              'More flexible memory layouts',
              'Hardware-specific optimizations',
              'Auto-tuning capabilities',
              'Other (please specify):'
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
      //  Benchmarking
      {
        id: 'gemm-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'gemm-input-data-type',
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
            id: 'gemm-data-provision',
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
            id: 'gemm-scaling-requirements',
            title: 'Scaling Requirements',
            type: 'checkbox',
            content: 'What are your scaling requirements for matrix multiplication?',
            options: [
              'Strong scaling (fixed total problem size)',
              'Weak scaling (fixed problem size per process/node)',
              'Both strong and weak scaling needed',
              'No specific scaling requirements'
            ]
          },
          {
            id: 'gemm-precision-type',
            title: 'Working Precision',
            type: 'checkbox',
            content: 'What numerical precision do you use or need for matrix multiplication? Select all that apply:',
            options: [
              'Single precision (32-bit)',
              'Double precision (64-bit)',
              'Extended/Quad precision (128-bit)',
              'Mixed precision (e.g., FP32 multiplication with FP64 accumulation)',
              'Low precision (e.g., FP16, BF16)',
              'Adaptive precision (based on numerical requirements)',
              'Precision matching input matrix type',
              'Different precision for computation vs. storage',
              'Tensor Core compatible precisions'
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
      }      
    ]
  }
]; 