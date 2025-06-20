// Define Application CategoriesA
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
  repository?: string;
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

    Key numerical linear algebra aspects:
    - Complex linear algebra operations for Green\'s function methods
    - Parallel eigenvalue solvers for quasiparticle calculations
    - Efficient handling of large matrices in GW calculations
    - Linear response calculations using advanced linear algebra
    - Integration with high-performance libraries for optimal performance

    The code heavily relies on distributed linear algebra operations and benefits greatly from modern numerical libraries that can efficiently handle both dense and sparse computations on large matrices.`,
    logo: '/applications/logo/yambo_logo.png',
    website: 'https://www.yambo-code.eu/',
    repository: 'https://github.com/yambo-code/yambo',
    categories: [applicationCategories.MATERIALS_SCIENCE, applicationCategories.PHYSICS_SIMULATION, applicationCategories.HIGH_PERFORMANCE_COMPUTING],
  }
]; 