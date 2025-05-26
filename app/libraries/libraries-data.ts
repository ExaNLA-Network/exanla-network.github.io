// Define Library Categories
export const libraryCategories = {
  DENSE_LINEAR_ALGEBRA: "Dense Linear Algebra",
  SPARSE_LINEAR_ALGEBRA: "Sparse Linear Algebra",
  EIGENVALUE_PROBLEMS: "Eigenvalue Problems",
  HIGH_PERFORMANCE_COMPUTING: "High-Performance Computing",
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
    id: 'elpa',
    name: 'ELPA',
    description: 'A high-performance library for solving large-scale symmetric/Hermitian eigenvalue problems on distributed memory computers.',
    features: [
      'Highly optimized eigensolvers for large matrices',
      'Distributed memory parallelization',
      'GPU acceleration support',
      'Specialized for electronic structure calculations',
      'Excellent scalability on HPC systems'
    ],
    language: 'Fortran / C',
    license: 'LGPL',
    website: 'https://elpa.mpcdf.mpg.de/',
    repository: 'https://gitlab.mpcdf.mpg.de/elpa/elpa',
    logo: '/libraries/elpa-logo.png',
    categories: [libraryCategories.EIGENVALUE_PROBLEMS, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'slate',
    name: 'SLATE',
    description: 'Next-generation software library for dense linear algebra operations designed to replace ScaLAPACK for modern HPC systems.',
    features: [
      'Parallel BLAS operations',
      'Dense linear system solvers',
      'Least squares solvers',
      'Eigenvalue problem solvers',
      'Modern C++ design with task-based parallelism'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://icl.utk.edu/slate/',
    repository: 'https://github.com/icl-utk-edu/slate',
    logo: '/libraries/slate-logo.png',
    categories: [libraryCategories.DENSE_LINEAR_ALGEBRA, libraryCategories.EIGENVALUE_PROBLEMS, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'magma',
    name: 'MAGMA',
    description: 'Dense linear algebra library similar to LAPACK but optimized for heterogeneous/hybrid architectures, particularly CPU+GPU systems.',
    features: [
      'Hybrid CPU+GPU algorithms',
      'Dense linear algebra routines',
      'Algorithms-by-tiles approach',
      'Dynamic scheduling',
      'LAPACK-style interface'
    ],
    language: 'C++ / CUDA',
    license: 'BSD-3',
    website: 'https://icl.utk.edu/magma/',
    repository: 'https://bitbucket.org/icl/magma',
    logo: '/libraries/magma-logo.png',
    categories: [libraryCategories.DENSE_LINEAR_ALGEBRA, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'eigenexa',
    name: 'EigenExa',
    description: 'A high-performance dense eigenvalue solver developed at RIKEN, specifically designed for large-scale parallel computing systems including the K computer and Fugaku.',
    features: [
      'Highly optimized for large-scale parallel systems',
      'Specialized in symmetric eigenvalue problems',
      'Advanced parallel algorithms for matrix operations',
      'Excellent scalability on many-core architectures',
      'Integration with major scientific applications'
    ],
    language: 'Fortran',
    license: 'BSD-3',
    website: 'https://www.r-ccs.riken.jp/labs/lpnctrt/en/projects/eigenexa/',
    repository: 'https://github.com/RIKEN-RCCS/EigenExa',
    logo: '/libraries/eigenexa-logo.png',
    categories: [libraryCategories.EIGENVALUE_PROBLEMS, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'chase',
    name: 'ChASE',
    description: 'A modern C++ implementation of the Chebyshev Accelerated Subspace Eigenvalue Solver for computing selected eigenpairs of large Hermitian matrices.',
    features: [
      'Optimized for dense Hermitian eigenproblems',
      'Highly efficient parallel implementation',
      'GPU acceleration support',
      'Subspace iteration',
      'Excellent scalability for large matrices'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://chase-library.github.io/ChASE/',
    repository: 'https://github.com/ChASE-library/ChASE',
    logo: '/libraries/logo/ChASE_Logo_RGB.png',
    categories: [libraryCategories.EIGENVALUE_PROBLEMS, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'dla-future',
    name: 'DLA-Future',
    description: 'Modern C++ framework for distributed memory linear algebra algorithms, focusing on productivity and performance portability.',
    features: [
      'Task-based programming model',
      'Shared-memory style distributed algorithms',
      'High performance on modern HPC systems',
      'Modern C++ design patterns',
      'Excellent maintainability'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://github.com/eth-cscs/DLA-Future',
    repository: 'https://github.com/eth-cscs/DLA-Future',
    logo: '/libraries/dla-future-logo.png',
    categories: [libraryCategories.DENSE_LINEAR_ALGEBRA, libraryCategories.HIGH_PERFORMANCE_COMPUTING],
  },
]; 