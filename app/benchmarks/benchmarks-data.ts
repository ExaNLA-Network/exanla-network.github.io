export interface BenchmarkResultItem {
  library: string;
  performance?: string;
  hardware?: string;
  problem_size?: string;
  N?: string;
  GFLOPS?: string;
  scaling_type?: string;
  nodes?: string;
  efficiency?: string;
  time_seconds?: string;
  accuracy?: string;
  problem_size_total?: string;
  peak_memory_gb?: string;
  notes?: string;
  base_precision?: string;
  mixed_setup?: string;
  speedup_vs_fp64?: string;
  matrix_size?: string;
  batch_count?: string;
  effective_gflops?: string;
  sustained_gflops_node?: string;
  total_pflops?: string;
  hardware_node?: string;
  percentage_spectrum?: string;
}

export const BenchmarkMainCategories = {
  EIGENVALUE_PROBLEMS: "Eigenvalue Problems",
  GEMM_OPERATIONS: "GEMM Operations",
} as const;

export type BenchmarkMainCategoryValue = typeof BenchmarkMainCategories[keyof typeof BenchmarkMainCategories];

export interface BenchmarkData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  mainCategory: BenchmarkMainCategoryValue;
  problemDescription: string;
  results: BenchmarkResultItem[];
  analysis: string;
  chartType: string;
  // We can add more specific fields later like methodology, hardwareDetails, etc.
  name: string;
  description: string;
  category: string;
  metrics: {
    [key: string]: number | string;
  };
}

export const benchmarksData: BenchmarkData[] = [
  {
    id: 'dense-eigenvalue-problem',
    slug: 'dense-eigenvalue-problem',
    title: 'Dense Eigenvalue Problem Performance',
    summary: 'Comparing eigensolvers for dense symmetric/Hermitian matrices.',
    mainCategory: BenchmarkMainCategories.EIGENVALUE_PROBLEMS,
    problemDescription: 'Solving dense eigenvalue problems (Ax = λx) for symmetric or Hermitian matrices is a cornerstone of many scientific and engineering disciplines, including quantum chemistry (e.g., electronic structure calculations), condensed matter physics, structural mechanics, and principal component analysis in data science. These problems typically involve finding all or a subset of eigenvalues and eigenvectors of large, dense matrices. The computational cost often scales as O(N^3) with matrix size N, and memory requirements can be substantial, making efficient parallel algorithms and high-performance libraries essential for tackling large-scale simulations on modern HPC systems.',
    results: [
      /* { library: 'ELPA', performance: '42.1 TFLOPS', hardware: 'AMD EPYC + NVIDIA A100', problem_size: '100K×100K' },
      { library: 'EigenExa', performance: '38.4 TFLOPS', hardware: 'AMD EPYC + NVIDIA A100', problem_size: '100K×100K' },
      { library: 'MAGMA', performance: '35.2 TFLOPS', hardware: 'AMD EPYC + NVIDIA A100', problem_size: '100K×100K' },
      { library: 'ScaLAPACK (Reference)', performance: '22.8 TFLOPS', hardware: 'AMD EPYC + NVIDIA A100', problem_size: '100K×100K' } */
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'Dense Eigenvalue Problem Performance',
    description: 'Comparing eigensolvers for dense symmetric/Hermitian matrices.',
    category: 'Eigenvalue Problems',
    metrics: {
      // Replace any with specific types
    },
  },
  {
    id: 'gemm-performance',
    slug: 'gemm-performance',
    title: 'GEMM Performance (Double Precision)',
    summary: 'Comparing General Matrix Multiplication (DGEMM) performance across libraries.',
    mainCategory: BenchmarkMainCategories.GEMM_OPERATIONS,
    problemDescription: 'Benchmarking double-precision general matrix multiplication (DGEMM) is crucial as it is a fundamental building block for many HPC applications. This test measures sustained floating-point performance for large square matrices (N x N).',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'GEMM Performance (Double Precision)',
    description: 'Comparing General Matrix Multiplication (DGEMM) performance across libraries.',
    category: 'GEMM Operations',
    metrics: {
      // Replace any with specific types
    },
  },
  // NEW BENCHMARKS START HERE
  {
    id: 'selected-eigenvalue-performance',
    slug: 'selected-eigenvalue-performance',
    title: 'Selected Eigenvalue Problem Performance',
    summary: 'Time to compute a subset of eigenvalues and eigenvectors.',
    mainCategory: BenchmarkMainCategories.EIGENVALUE_PROBLEMS,
    problemDescription: 'Many scientific applications require only a fraction of the eigenvalue spectrum (e.g., eigenvalues near a certain energy or the k smallest/largest). Selected eigenvalue solvers are optimized for this task, often outperforming full spectrum solvers significantly. This benchmark evaluates the time to compute a fixed percentage (e.g., 10%) of eigenpairs for large matrices, as well as the achieved accuracy.',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'Selected Eigenvalue Problem Performance',
    description: 'Time to compute a subset of eigenvalues and eigenvectors.',
    category: 'Eigenvalue Problems',
    metrics: {
      // Replace any with specific types
    },
  },
  {
    id: 'parallel-scaling-eigenvalue',
    slug: 'parallel-scaling-eigenvalue',
    title: 'Parallel Scaling Efficiency (Eigenvalue Solvers)',
    summary: 'Strong and weak scaling performance of eigenvalue solvers on distributed systems.',
    mainCategory: BenchmarkMainCategories.EIGENVALUE_PROBLEMS,
    problemDescription: 'Evaluating the parallel scaling efficiency of eigenvalue solvers is crucial for their effective use on large HPC clusters. This benchmark assesses both strong scaling (fixed total problem size, increasing compute nodes) and weak scaling (fixed problem size per node, increasing compute nodes) for leading libraries.',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'line', // Could be two separate charts or a combined one
    name: 'Parallel Scaling Efficiency (Eigenvalue Solvers)',
    description: 'Strong and weak scaling performance of eigenvalue solvers on distributed systems.',
    category: 'Eigenvalue Problems',
    metrics: {
      // Replace any with specific types
    },
  },
  {
    id: 'memory-efficiency-eigenvalue',
    slug: 'memory-efficiency-eigenvalue',
    title: 'Memory Efficiency (Eigenvalue Solvers)',
    summary: 'Comparing peak memory consumption for large eigenvalue problems.',
    mainCategory: BenchmarkMainCategories.EIGENVALUE_PROBLEMS,
    problemDescription: 'Memory footprint can be a critical limiting factor for large-scale eigenvalue calculations. This benchmark compares the peak memory usage (per node or total) of different eigenvalue solvers for a standardized large problem (e.g., 100K x 100K matrix), highlighting libraries with more memory-frugal algorithms or implementations.',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'Memory Efficiency (Eigenvalue Solvers)',
    description: 'Comparing peak memory consumption for large eigenvalue problems.',
    category: 'Eigenvalue Problems',
    metrics: {
      // Replace any with specific types
    },
  },
  {
    id: 'batched-gemm-performance',
    slug: 'batched-gemm-performance',
    title: 'Batched GEMM Performance',
    summary: 'Performance of GEMM for many small matrices processed in batches.',
    mainCategory: BenchmarkMainCategories.GEMM_OPERATIONS,
    problemDescription: 'Batched GEMM operations involve performing many independent matrix multiplications on small matrices. This is common in applications like deep learning (tensor contractions), scientific simulations with many small systems (e.g., astrophysics, materials science), and block-oriented algorithms. This benchmark evaluates the throughput (e.g., GFLOPS or matrices per second) for various batch sizes and matrix dimensions.',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'Batched GEMM Performance',
    description: 'Performance of GEMM for many small matrices processed in batches.',
    category: 'GEMM Operations',
    metrics: {
      // Replace any with specific types
    },
  },
  {
    id: 'distributed-gemm-scaling',
    slug: 'distributed-gemm-scaling',
    title: 'Distributed GEMM Scaling (PDGEMM)',
    summary: 'Scaling of General Matrix Multiplication across multiple compute nodes.',
    mainCategory: BenchmarkMainCategories.GEMM_OPERATIONS,
    problemDescription: 'For matrices too large to fit in the memory of a single compute node, or to accelerate computations, GEMM operations must be distributed across multiple nodes. This benchmark evaluates the strong and weak scaling performance of distributed GEMM implementations (e.g., ScaLAPACK\'s PDGEMM, SLATE, DLA-Future) using metrics like sustained GFLOPS and parallel efficiency.',
    results: [
    ],
    analysis: 'To be updated',
    chartType: 'bar',
    name: 'Distributed GEMM Scaling (PDGEMM)',
    description: 'Scaling of General Matrix Multiplication across multiple compute nodes.',
    category: 'GEMM Operations',
    metrics: {
      // Replace any with specific types
    },
  },
  // Add more benchmarks here in the future
]; 