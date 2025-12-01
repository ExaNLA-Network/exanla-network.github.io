// Define Library Categories
export const libraryCategories = {
  DENSE_LINEAR_ALGEBRA: "Dense Linear Algebra",
  SPARSE_LINEAR_ALGEBRA: "Sparse Linear Algebra",
  EIGENVALUE_PROBLEMS: "Eigenvalue Problems",
  SINGULAR_VALUE_PROBLEMS: "Singular Value Problems",
  HIGH_PERFORMANCE_COMPUTING: "High-Performance Computing",
  HERMITIAN_SYMMETRIC: "Hermitian/Symmetric",
  NON_HERMITIAN_SYMMETRIC: "Non-Hermitian/Symmetric",
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
  },
  {
    id: 'slepc',
    name: 'SLEPc',
    description: 'A PETSc-based toolkit for the (partial) solution of various types of eigenvalue problems, focusing on large-scale sparse or matrix-free problems with iterative algorithms.',
    features: [
      'Covers both standard and generalized eigenproblems, either Hermitian or non-Hermitian',
      'Support for structured eigenproblems (Bethe–Salpeter and other)',
      'Easy selection of available solvers: Krylov-Schur, Jacobi-Davidson, LOBPCG, contour integral, etc.',
      'Built-in support for shift-and-invert spectral transformation, as well as polynomial filters',
      'Also (partial) solution of different singular value problems: SVD, GSVD, HSVD',
      'Polynomial eigenvalue problems (either quadratic or higher degree) with or without (implicit) linearization',
      'Support for general nonlinear eigenvalue problems involving almost any nonlinear function (including rational, square root, exponential)',
      'Basic functionality for computing the action of a matrix function on a vector',
      'Tight integration with PETSc, leveraging all linear system solvers and basic infrastructure',
      'MPI and GPU parallelism',
      'Real or complex arithmetic, with single, double, or quad precision'
    ],
    language: 'C',
    license: 'BSD-2',
    website: 'https://slepc.upv.es',
    repository: 'https://gitlab.com/slepc/slepc',
    logo: '/libraries/logo/slepc-logo.jpg',
    categories: [
      libraryCategories.SPARSE_LINEAR_ALGEBRA,
      libraryCategories.EIGENVALUE_PROBLEMS,
      libraryCategories.SINGULAR_VALUE_PROBLEMS,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.HERMITIAN_SYMMETRIC,
      libraryCategories.NON_HERMITIAN_SYMMETRIC,
      libraryCategories.QUASI_HERMITIAN_SYMMETRIC,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  },
  {
    id: 'dla-future',
    name: 'DLA-Future',
    description: 'A distributed linear algebra library implemented using C++ std::execution. It provides an asynchronous C++ interface, a synchronous C interface, and a synchronous ScaLAPACK-like C interface.',
    features: [
      'Dense Symmetric/Hermitian eigenproblems',
      'Dense Symmetric/Hermitian generalized eigenproblems',
      'Cholesky factorization and inverse of positive definite matrices',
      'Highly efficient parallel implementation',
      'Integration with vendor libraries (MKL, cuBLAS, rocBLAS, etc.)',
      'Modern C++ design with C++ standard task-based parallelism (std::execution)',
      'Multi-core systems support',
      'NVIDIA GPU acceleration support',
      'AMD GPU acceleration support',
      'Multi-node and multi-GPU support through MPI',
      'Real or complex arithmetic, with single or double precision',
      'Installable with Spack'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://github.com/eth-cscs/DLA-Future',
    repository: 'https://github.com/eth-cscs/DLA-Future',
    logo: '',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.EIGENVALUE_PROBLEMS,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.HERMITIAN_SYMMETRIC,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  },
  {
    id: 'dla-future-fortran',
    name: 'DLA-Future-Fortran',
    description: 'Fortran wrappers for DLA Future.',
    features: [
      'Dense Symmetric/Hermitian eigenproblems',
      'Dense Symmetric/Hermitian generalized eigenproblems',
      'Cholesky factorization and inverse of positive definite matrices',
      'Highly efficient parallel implementation',
      'Integration with vendor libraries (MKL, cuBLAS, rocBLAS, etc.)',
      'Modern C++ design with C++ standard task-based parallelism (std::execution)',
      'Multi-core systems support',
      'NVIDIA GPU acceleration support',
      'AMD GPU acceleration support',
      'Multi-node and multi-GPU support through MPI',
      'Real or complex arithmetic, with single or double precision',
      'Installable with Spack'
    ],
    language: 'Fortran',
    license: 'BSD-3',
    website: 'https://eth-cscs.github.io/DLA-Future-Fortran/main',
    repository: 'https://github.com/eth-cscs/DLA-Future-Fortran',
    logo: '',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.EIGENVALUE_PROBLEMS,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.HERMITIAN_SYMMETRIC,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  },
  {
    id: 'cosma',
    name: 'COSMA',
    description: 'COSMA is a parallel, high-performance, GPU-accelerated, communication-optimal matrix-matrix multiplication.',
    features: [
      'Dense matrix-matrix multiplication',
      'Communication-optimal implementation',
      'Highly efficient parallel implementation',
      'Integration with vendor libraries (MKL, cuBLAS, rocBLAS, etc.)',
      'Multi-core systems support',
      'NVIDIA GPU acceleration support',
      'AMD GPU acceleration support',
      'Multi-node and multi-GPU support through MPI',
      'Real or complex arithmetic, with single or double precision',
      'Installable with Spack'
    ],
    language: 'C++',
    license: 'BSD-3',
    website: 'https://github.com/eth-cscs/COSMA',
    repository: 'https://github.com/eth-cscs/COSMA',
    logo: '/libraries/logo/cosma-logo.svg',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  },
  {
    id: 'elpa',
    name: 'ELPA',
    description: 'Highly efficient and highly scalable direct eigensolvers for symmetric (hermitian) matrices.',
    features: [
      'Dense Hermitian standard and generalized eigenproblems',
      'Dense quasi-Hermitian eigenproblems (skew-symmetric and related Bethe–Salpeter)',
      '1- and 2-stage direct eigensolver algorithms. 2-stage solver is especially efficient when only a part of the eigenspectrum is needed',
      'Distributed dense matrix-matrix multiplication',
      'Support for NVIDIA, AMD, and Intel GPUs',
      'Demonstrated pre-exascale runs: full eigenspectrum of 3,200,000*3,200,000 real double matrix on LUMI',
    ],
    language: 'Fortran',
    license: 'LGPL-3',
    website: 'https://elpa.mpcdf.mpg.de/',
    repository: 'https://gitlab.mpcdf.mpg.de/elpa/elpa',
    logo: '/libraries/logo/elpa-logo.png',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.EIGENVALUE_PROBLEMS,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.HERMITIAN_SYMMETRIC,
      libraryCategories.QUASI_HERMITIAN_SYMMETRIC,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY
    ],
  },
  {
    id: 'ntpoly',
    name: 'NTPoly',
    description: 'NTPoly is a massively parallel library for computing the functions of sparse, symmetric matrices based on polynomial expansions.',
    features: [
      'Sparse matrix-matrix multiplication',
      'Highly efficient parallel implementation',
      'Multi-core systems support',
      'Real or complex arithmetic',
      'General polynomials (standard, chebyshev, hermite)',
      'Transcendental functions (trigonometric, exponential, logarithm)',
      'Matrix roots and inverses',
      'Density matrix purification, sign function, polar decomposition',
    ],
    language: 'Fortran, C++, Python',
    license: 'MIT',
    website: 'https://william-dawson.github.io/NTPoly/',
    repository: 'https://github.com/william-dawson/NTPoly',
    logo: '/libraries/logo/ntpoly-logo.png',
    categories: [
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.DISTRIBUTED_MEMORY,
      libraryCategories.SPARSE_LINEAR_ALGEBRA,
      libraryCategories.HERMITIAN_SYMMETRIC
    ],
  },
  {
    id: 'chameleon',
    name: 'Chameleon',
    description: 'Dense linear algebra subroutines for heterogeneous and distributed architectures',
    features: [
      'Dense matrix mutiplication (GEMM, SYMM, TRMM)',
      'Dense matrix factorization and linear system solve (GETR, POTR, GEQR, GELQ, GELS)',
      'Integration with vendor libraries (Blis/Flame, OpenBLAS, MKL, cuBLAS, rocBLAS, etc.)',
      'Multi-core systems support',
      'NVIDIA GPU acceleration support',
      'AMD GPU acceleration support',
      'Multi-node and multi-GPU support through MPI',
      'Real or complex arithmetic, with single or double precision',
      'Installable with CMake, GNU Guix, Homebrew, Spack'
    ],
    language: 'C',
    license: 'CeCILL-C',
    website: 'https://solverstack.gitlabpages.inria.fr/chameleon/',
    repository: 'https://gitlab.inria.fr/solverstack/chameleon',
    logo: '/libraries/logo/chameleon-logo.png',
    categories: [
      libraryCategories.DENSE_LINEAR_ALGEBRA,
      libraryCategories.HIGH_PERFORMANCE_COMPUTING,
      libraryCategories.GPU_ACCELERATION,
      libraryCategories.DISTRIBUTED_MEMORY,
      libraryCategories.HERMITIAN_SYMMETRIC,
    ],
  }
];
