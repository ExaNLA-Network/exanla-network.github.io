// Define Application CategoriesA
export const applicationCategories = {
  COMPUTATIONAL_CHEMISTRY: "Computational Chemistry",
  MATERIALS_SCIENCE: "Materials Science",
  PHYSICS_SIMULATION: "Physics Simulation",
  HIGH_PERFORMANCE_COMPUTING: "High-Performance Computing",
  BIOPHYSICS: "Biophysics",
} as const;

export type ApplicationCategoryValue = typeof applicationCategories[keyof typeof applicationCategories];

export interface Application {
  id: string;
  title: string;
  description: string;
  content: string;
  key_linalg_components: string[];
  additional_linalg_info?: string;  
  logo: string;
  website: string;
  repository?: string;
  categories: ApplicationCategoryValue[];
}

// Applications data
export const applications: Application[] = [
  {
    id: 'dftbplus',
    title: 'DFTB+',    
    description: 'DFTB+ is a fast and versatile quantum mechanical simulation software package',
    content: `Using DFTB+ you can carry out atomistic quantum
    mechanical simulations that are similar to density functional
    theory but in an approximate way, using the DFTB and xTB families
    of semi-empirical models.  DFTB+ is typically around two orders of
    magnitude faster than DFT, but can perform similar types of
    calculations, which include:

    • Ground state calculations for solids and molecules, for either
      static structures or with molecular dynamics

    • Open boundary quantum transport of electrons or phonons using
      non-equilibrium Green's functions

    • Excited state and time-dependent electronic structure
      calculations with RPA/Casida, Ehrenfest and time-dependent
      perturbation theory      

    See J. Phys. Chem. A 129, 5373 (2025) for recent functionality
    additions and capabilities.`,
    key_linalg_components: ['Parallel eigenvalue or direct density matrix solvers for ground state calculations (provided by external libraries)', 'Sparse internal Hamiltonian and single particle density matrix storage', 'Complex valued linear algebra operations for Green\'s function methods', 'Parallel GEMM and matrix inversion operations for real-time electronic dynamics', 'Iterative eigensolvers for excited state calculations'],
    additional_linalg_info: 'You can use DFTB+ either as a standalone application or embed it into other academic or commercial simulation packages as a library. DFTB+ is free software under the GNU Lesser General Public License.',
    logo: '/applications/logo/dftbplus-logo-600x600.png',
    website: 'https://www.dftbplus.org/',
    repository: 'https://github.com/dftbplus',
    categories: [applicationCategories.COMPUTATIONAL_CHEMISTRY,
    applicationCategories.MATERIALS_SCIENCE,
    applicationCategories.PHYSICS_SIMULATION,
    applicationCategories.BIOPHYSICS,
    applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'quantum-espresso',
    title: 'Quantum ESPRESSO',
    description: 'An integrated suite for first-principles electronic structure calculations and materials modeling',
    content: `Quantum ESPRESSO is an integrated suite of open-source computer codes for electronic-structure calculations and materials modeling at the nanoscale. It is based on density-functional theory, plane waves, and pseudopotentials.

    The integration with modern linear algebra libraries like ELPA and MAGMA has significantly improved its performance on modern HPC architectures, enabling larger and more complex simulations.`,
    key_linalg_components: ['Dense eigenvalue problems for electronic states calculation', 
                            'Large-scale parallel diagonalization using ELPA or other solvers', 
                            'Iterative eigensolvers for ground state calculations', 
                            'Efficient handling of plane-wave basis sets', 
                            'Performance optimization through advanced linear algebra libraries'],
    logo: '/applications/logo/logo-quantumespresso_10.jpg',
    website: 'https://www.quantum-espresso.org/',
    repository: 'https://github.com/QEF/q-e',
    categories: [applicationCategories.COMPUTATIONAL_CHEMISTRY, applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
    {
    id: 'siesta',
    title: 'SIESTA',
    description: 'A DFT code using localized atomic orbitals and pseudopotentials',
    content: `SIESTA is both a method and its computer program implementation, to perform efficient electronic structure calculations and ab initio molecular dynamics simulations of molecules and solids. SIESTA's efficiency stems from the use of a basis set of strictly-localized atomic orbitals. A very important feature of the code is that its accuracy and cost can be tuned in a wide range, from quick exploratory calculations to highly accurate simulations matching the quality of other approaches, such as plane-wave methods.

The possibility of treating large systems with some first-principles electronic-structure methods has opened up new opportunities in many disciplines. The SIESTA program is open source and has become quite popular, being increasingly used by researchers in geosciences, biology, and engineering (apart from those in its natural habitat of materials physics and chemistry). Currently there are several thousand users all over the world, and the paper describing the method (J. Phys. Cond. Matt. 14, 2745 (2002)) has received more than 11,000 citations so far.

SIESTA includes the TranSIESTA module, which provides the ability to model open-boundary systems where ballistic electron transport is taking place. Using TranSIESTA one can compute electronic transport properties, such as the zero-bias conductance and the I-V characteristic, of a nanoscale system in contact with two electrodes at different electrochemical potentials.`,
    key_linalg_components: ['Generalized eigenvalue solvers for Kohn–Sham equations',
                            'Scalable parallel solvers and integration with PEXSI for large systems',
                            'To be Updated..',
                            ],
    logo: '/applications/logo/SIESTA-logo-233x125.png',
    website: 'https://siesta-project.org/',
    repository: 'https://gitlab.com/siesta-project/siesta',
    categories: [applicationCategories.COMPUTATIONAL_CHEMISTRY, applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'yambo',
    title: 'YAMBO',
    description: 'A state-of-the-art code for Many-Body calculations in solid state and molecular physics',
    content: `YAMBO is a scientific code implementing Many-Body Perturbation Theory (MBPT) methods for calculating electronic and optical properties of materials from first principles. It takes full advantage of modern HPC architectures through optimized linear algebra operations.

    The code heavily relies on distributed linear algebra operations and benefits greatly from modern numerical libraries that can efficiently handle both dense and sparse computations on large matrices.`,
    key_linalg_components: ['Complex linear algebra operations for Green\'s function methods', 
                            'Parallel eigenvalue solvers for quasiparticle calculations', 
                            'Efficient handling of large matrices in GW calculations', 
                            'Linear response calculations using advanced linear algebra', 
                            'Integration with high-performance libraries for optimal performance'],
    logo: '/applications/logo/yambo_logo.png',
    website: 'https://www.yambo-code.eu/',
    repository: 'https://github.com/yambo-code/yambo',
    categories: [applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
  id: 'bigdft',
  title: 'BigDFT',
  description: 'A wavelet-based DFT code supporting both cubic and linear scaling methods, combining wavelet convolutions with advanced solvers for sparse and dense linear algebra',
  content: `BigDFT is a pseudopotential electronic structure code based on Daubechies wavelets, offering a flexible, systematically convergent basis set with minimal numerical noise. It supports both standard cubic-scaling DFT and a fully featured linear-scaling mode, enabling large-scale quantum simulations for materials, biological systems, and nanostructures.
In its linear-scaling mode, BigDFT leverages the sparsity of the underlying wavelet-based representation to directly compute the density matrix using matrix function expansions. This approach enables simulations with thousands of atoms with controlled accuracy and efficiency.

  The Poisson solver in BigDFT is designed to efficiently compute the electrostatic potential on a real space grid representation with flexible boundary conditions (free, periodic, slab, wire). It has been accelerated in different heterogeneous architectures and supports various backends for exascale readiness.

  BigDFT's hybrid capabilities—combining precision, adaptivity, and scalability—make it a versatile platform for modern high-performance and exascale computing environments.`,
  key_linalg_components: ['Dense eigensolvers for traditional cubic-scaling Kohn–Sham calculations', 
                          'Sparse matrix function evaluations using Chebyshev polynomial expansion (via the CheSS library)', 
                          'Support for distributed sparse matrix operations and density matrix construction via NTPoly library', 
                          'Direct computation of the density matrix without diagonalization in linear-scaling mode', 
                          'Use of localized support functions leading to sparse Hamiltonian and overlap matrices', 
                          'Scalable parallel algorithms for both dense and sparse regimes'],
  logo: '/applications/logo/bigdft_logo.png',
  website: 'https://www.bigdft.org/',
  repository: 'https://gitlab.com/l_sim/bigdft-suite',
  categories: [
    applicationCategories.MATERIALS_SCIENCE,
    applicationCategories.COMPUTATIONAL_CHEMISTRY,
    applicationCategories.BIOPHYSICS,
    applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'cp2k',
    title: 'CP2K',
    description: 'CP2K is a quantum chemistry and solid state physics software package that can perform atomistic simulations of solid state, liquid, molecular, periodic, material, crystal, and biological systems.',
    content: `CP2K provides a general framework for different electronic structure methods (DFT, HF, MP2, RPA, GW, ...) and ab-initio or QM/MM molecular dynamics simulations using the mixed Gaussian/plane waves approaches GPW and GAPW.`,

    key_linalg_components: ['Dense eigenvalue problems for electronic states calculation using ScaLAPACK, DLA-Future or ELPA', 
                            'Cholesky decomposition and inverse of positive definite matrices using ScaLAPACK or DLA-Future',
                            'Dense matrix matrix multiplication using COSMA library',
                            'Block sparse matrix matrix multiplication using DBCSR library'],

    logo: '/applications/logo/logo-cp2k.png',
    website: 'https://www.cp2k.org/',
    repository: 'https://github.com/cp2k/cp2k/',
    categories: [
      applicationCategories.COMPUTATIONAL_CHEMISTRY,
      applicationCategories.MATERIALS_SCIENCE,
      applicationCategories.PHYSICS_SIMULATION,
      applicationCategories.BIOPHYSICS,
      applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'sirius',
    title: 'SIRIUS',
    description: 'SIRIUS is a domain specific library for electronic structure calculations. It implements pseudopotential plane wave (PP-PW) and full potential linearized augmented plane wave (FP-LAPW) methods.',
    content: `The following functionalities are currently implemented in SIRIUS:

    - (PP-PW) Norm-conserving, ultrasoft and PAW pseudopotentials, spin-orbit coupling, stress tensor, atomic forces, collinear and non-collinear magnetism

    - (FP-LAPW) APW and LAPW basis sets with arbitrary number of local orbitals, ZORA and IORA approximations for valence states; full relativistic Dirac equation for core states, atomic forces, collinear and non-collinear magnetism

    - Symmetrization of lattice-periodic functions and on-site matrices, generation of irreducible k-meshes`,

    key_linalg_components: ['Dense eigenvalue problems for electronic states calculation using ScaLAPACK, DLA-Future or ELPA',
                            'Custom optimized implementation for distributed tall and skinny matrix matrix multiplication',
                            'Non distributed matrix matrix multiplication and dense generalized eigenvalue problems using vendor BLAS and LAPACK (CPU and/or GPU) or MAGMA'],

    logo: '/applications/logo/logo-sirius.png',
    website: 'https://github.com/electronic-structure/SIRIUS',
    repository: 'https://github.com/electronic-structure/SIRIUS',
    categories: [
      applicationCategories.COMPUTATIONAL_CHEMISTRY,
      applicationCategories.MATERIALS_SCIENCE,
      applicationCategories.PHYSICS_SIMULATION,
      applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  }
]; 
