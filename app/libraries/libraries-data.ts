// Define Library Categories
export const libraryCategories = {
  DENSE_LINEAR_ALGEBRA: "Dense Linear Algebra",
  SPARSE_LINEAR_ALGEBRA: "Sparse Linear Algebra",
  EIGENVALUE_PROBLEMS: "Eigenvalue Problems",
  HIGH_PERFORMANCE_COMPUTING: "High-Performance Computing",
  HERMITIAN_SYMMETRIC: "Hermitian/Symmetric",
  QUASI_HERMITIAN_SYMMETRIC: "Quasi-Hermitian/Symmetric",
  GPU_ACCELERATION: "GPU Acceleration",
  DISTRIBUTED_MEMORY: "Distributed Memory",
  SUBSPACE_ITERATION: "Subspace Iteration",
} as const;

export type LibraryCategoryValue = typeof libraryCategories[keyof typeof libraryCategories];

export interface Library {
  id: string;
  name: string;
  description: string;
  features: string[];
  language: string;
  license: string;
  website: string;
  repository: string;
  logo: string;
  categories: LibraryCategoryValue[];
}

// Libraries data
export const libraries: Library[] = [
  {
    id: 'slate',
    name: 'SLATE',
    description: 'Next-generation software library for dense linear algebra operations designed to replace ScaLAPACK for modern HPC systems.',
    features: [
      'Full coverage of LAPACK and ScaLAPACK functionality',
      'Parallel BLAS operations with GPU acceleration',
      'Dense linear system solvers',
      'Least squares solvers',
      'Singular value and eigenvalue solvers',
      'Support for distributed-memory systems',
      'Built on MPI and OpenMP standards',
      'Integration with vendor libraries (MKL, cuBLAS, rocBLAS, etc.)',
      'Modern C++ design with task-based parallelism',
      'Optimized for both GPU-accelerated and multi-core systems'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://icl.utk.edu/slate/',
    repository: 'https://github.com/icl-utk-edu/slate',
    logo: '/libraries/logo/slate-logo.png',
    categories: [libraryCategories.DENSE_LINEAR_ALGEBRA, 
                 libraryCategories.EIGENVALUE_PROBLEMS, 
                 libraryCategories.HIGH_PERFORMANCE_COMPUTING,
                 libraryCategories.HERMITIAN_SYMMETRIC,
                 libraryCategories.QUASI_HERMITIAN_SYMMETRIC,
                 libraryCategories.GPU_ACCELERATION,
                 libraryCategories.DISTRIBUTED_MEMORY],
  },
  {
    id: 'chase',
    name: 'ChASE',
    description: 'A modern C++ implementation of the Chebyshev Accelerated Subspace Eigenvalue Solver for computing selected eigenpairs of large Hermitian and quasi-Hermitian matrices.',
    features: [
      'Optimized for dense Hermitian eigenproblems',
      'Optimized for dense quasi-Hermitian eigenproblems (Bethe–Salpeter equations)',
      'Highly efficient parallel implementation',
      'GPU acceleration support',
      'Subspace iteration',
      'Excellent scalability for large matrices',
      'Distributed memory support',
      'Multi-GPU support'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://chase-library.github.io/ChASE/',
    repository: 'https://github.com/ChASE-library/ChASE',
    logo: '/libraries/logo/ChASE_Logo_RGB.jpg',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.EIGENVALUE_PROBLEMS,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.HERMITIAN_SYMMETRIC,
      libraryCategories.QUASI_HERMITIAN_SYMMETRIC,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.SUBSPACE_ITERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  }
]; 