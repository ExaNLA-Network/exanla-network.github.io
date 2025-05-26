// Define Application Categories
export const applicationCategories = {
  COMPUTATIONAL_CHEMISTRY: "Computational Chemistry",
  MATERIALS_SCIENCE: "Materials Science",
  PHYSICS_SIMULATION: "Physics Simulation",
  HIGH_PERFORMANCE_COMPUTING: "High-Performance Computing",
} as const;

export type ApplicationCategoryValue = typeof applicationCategories[keyof typeof applicationCategories];

export interface Application {
  id: string;
  title: string;
  description: string;
  content: string;
  logo: string;
  website: string;
  categories: ApplicationCategoryValue[];
}

// Applications data
export const applications: Application[] = [
  {
    id: 'quantum-espresso',
    title: 'Quantum ESPRESSO',
    description: 'An integrated suite for first-principles electronic structure calculations and materials modeling',
    content: `Quantum ESPRESSO is an integrated suite of open-source computer codes for electronic-structure calculations and materials modeling at the nanoscale. It is based on density-functional theory, plane waves, and pseudopotentials.
    
    Key numerical linear algebra components:
    - Dense eigenvalue problems for electronic states calculation
    - Large-scale parallel diagonalization using ELPA or other solvers
    - Iterative eigensolvers for ground state calculations
    - Efficient handling of plane-wave basis sets
    - Performance optimization through advanced linear algebra libraries

    The integration with modern linear algebra libraries like ELPA and MAGMA has significantly improved its performance on modern HPC architectures, enabling larger and more complex simulations.`,
    logo: '/applications/logo/logo-quantumespresso_10.jpg',
    website: 'https://www.quantum-espresso.org/',
    categories: [applicationCategories.COMPUTATIONAL_CHEMISTRY, applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'yambo',
    title: 'YAMBO',
    description: 'A state-of-the-art code for Many-Body calculations in solid state and molecular physics',
    content: `YAMBO is a scientific code implementing Many-Body Perturbation Theory (MBPT) methods for calculating electronic and optical properties of materials from first principles. It takes full advantage of modern HPC architectures through optimized linear algebra operations.

    Key numerical linear algebra aspects:
    - Complex linear algebra operations for Green\'s function methods
    - Parallel eigenvalue solvers for quasiparticle calculations
    - Efficient handling of large matrices in GW calculations
    - Linear response calculations using advanced linear algebra
    - Integration with high-performance libraries for optimal performance

    The code heavily relies on distributed linear algebra operations and benefits greatly from modern numerical libraries that can efficiently handle both dense and sparse computations on large matrices.`,
    logo: '/applications/yambo-logo.png',
    website: 'https://www.yambo-code.eu/',
    categories: [applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  },
  {
    id: 'cp2k',
    title: 'CP2K',
    description: 'A quantum chemistry and solid state physics software package for atomistic simulations',
    content: `CP2K is an open-source electronic structure and molecular dynamics software package that performs atomistic simulations of solid state, liquid, molecular, and biological systems. It provides a rich set of features based on density functional theory (DFT) using both the Gaussian and plane wave approaches.

    Key numerical linear algebra components:
    - Distributed dense matrix operations for electronic structure
    - Sparse matrix algebra for linear scaling DFT methods
    - Efficient eigensolvers using ELPA and other libraries
    - Matrix operations in mixed Gaussian/Plane-Wave approach
    - Advanced linear scaling techniques for large systems

    The performance of CP2K heavily relies on efficient linear algebra operations, particularly in its DBCSR (Distributed Block Compressed Sparse Row) library for sparse matrix operations and its integration with state-of-the-art dense linear algebra libraries like ELPA for diagonalization tasks.`,
    logo: '/applications/cp2k-logo.png',
    website: 'https://www.cp2k.org/',
    categories: [applicationCategories.COMPUTATIONAL_CHEMISTRY, applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  }
]; 