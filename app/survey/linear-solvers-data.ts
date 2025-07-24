import { SurveySection } from './types';

export const linearSolversData: SurveySection[] = [
  {
    id: 'linear-solvers-section',
    title: 'Linear System Solvers',
    description: 'Details about linear solver usage in your applications.',
    questions: [
      // Application Domain
      {
        id: 'linear-solver-domain',
        title: 'Application Domain',
        type: 'section',
        children: [
          {
            id: 'solver-electronic-structure',
            title: 'Electronic Structure Calculations',
            type: 'checkbox',
            content: 'Which electronic structure calculations use your linear solvers? Select all that apply:',
            options: [
              'Self-Consistent Field (SCF) iterations',
              'Response functions (DFPT)',
              'GW calculations',
              'Bethe-Salpeter Equation (BSE)',
              'Hartree-Fock / Post-HF methods',
              'Density matrix construction',
              'Poisson equation for Hartree potential',
              'Pulay/Anderson charge mixing',
              'Other (please specify)'
            ]
          },
          {
            id: 'solver-quantum-chemistry',
            title: 'Quantum Chemistry Methods',
            type: 'checkbox',
            content: 'Which quantum chemistry methods use your linear solvers? Select all that apply:',
            options: [
              'Fock matrix construction',
              'Roothaan equations',
              'Coupled Cluster equations',
              'MP2 calculations',
              'Configuration Interaction',
              'Tensor contractions',
              'Other (please specify)'
            ]
          },
          {
            id: 'solver-transport-green',
            title: 'Transport and Green\'s Function Methods',
            type: 'checkbox',
            content: 'Which transport/Green\'s function calculations use your linear solvers? Select all that apply:',
            options: [
              'NEGF calculations',
              'Complex Green\'s function (E±iη-H-Σ)⁻¹',
              'Transmission calculations',
              'Current calculations',
              'Spectral function calculations',
              'Other (please specify)'
            ]
          }
        ]
      },
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
              'Other (please specify)'
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
              'Frequency/energy dependent',
              'Time-dependent',
              'Other (please specify)'
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
      // Solver Methods
      {
        id: 'solver-methods',
        title: 'Solver Methods',
        type: 'section',
        children: [
          {
            id: 'direct-methods',
            title: 'Direct Methods',
            type: 'checkbox',
            content: 'Which direct methods do you use? Select all that apply:',
            options: [
              'LU decomposition',
              'Cholesky decomposition',
              'QR decomposition',
              'Direct inversion',
              'Sparse direct solvers',
              'Other (please specify)'
            ]
          },
          {
            id: 'iterative-methods',
            title: 'Iterative Methods',
            type: 'checkbox',
            content: 'Which iterative methods do you use? Select all that apply:',
            options: [
              'Conjugate Gradient (CG)',
              'GMRES',
              'BiCGStab',
              'MINRES',
              'Davidson method',
              'LOBPCG',
              'Chebyshev filtered',
              'Multigrid methods',
              'Other (please specify)'
            ]
          },
          {
            id: 'specialized-methods',
            title: 'Specialized Methods',
            type: 'checkbox',
            content: 'Which specialized methods do you use? Select all that apply:',
            options: [
              'Block solvers',
              'Mixed-precision solvers',
              'Matrix-free methods',
              'Domain decomposition',
              'Schur complement methods',
              'Other (please specify)'
            ]
          }
        ]
      },
      // Preconditioning
      {
        id: 'preconditioning',
        title: 'Preconditioning',
        type: 'section',
        children: [
          {
            id: 'preconditioner-types',
            title: 'Preconditioner Types',
            type: 'checkbox',
            content: 'Which preconditioners do you use? Select all that apply:',
            options: [
              'Jacobi',
              'ILU (Incomplete LU)',
              'Algebraic Multigrid (AMG)',
              'Geometric Multigrid',
              'Block preconditioners',
              'Physics-based preconditioners',
              'Other (please specify)'
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
              'Other (please specify)'
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
              'LAPACK',
              'ScaLAPACK',
              'ELPA',
              'DLA-Future',
              'SLATE',
              'MAGMA',
              'Intel MKL',
              'AMD AOCL',
              'Other (please specify)'
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
              'Other (please specify)'
            ]
          },
          {
            id: 'gpu-libraries',
            title: 'GPU Libraries',
            type: 'checkbox',
            content: 'Which GPU-accelerated libraries do you use? Select all that apply:',
            options: [
              'cuSOLVER',
              'cuBLAS',
              'rocSOLVER',
              'rocBLAS',
              'MAGMA',
              'Custom CUDA/HIP kernels',
              'Other (please specify)'
            ]
          }
        ]
      },
      // Large System Techniques
      {
        id: 'large-system-techniques',
        title: 'Large System Techniques',
        type: 'section',
        children: [
          {
            id: 'solver-techniques',
            title: 'Solver Techniques',
            type: 'checkbox',
            content: 'Which techniques do you use for solving large systems? Select all that apply:',
            options: [
              'Preconditioning (ILU, Jacobi, domain decomposition)',
              'Block or batched solves',
              'Mixed-precision solvers',
              'Asynchronous / task-parallel solves',
              'Solver on GPU',
              'Solver on CPU only',
              'Out-of-core solvers',
              'Communication-avoiding algorithms',
              'Other (please specify)'
            ]
          },
          {
            id: 'solver-optimizations',
            title: 'Solver Optimizations',
            type: 'checkbox',
            content: 'Which optimizations do you use? Select all that apply:',
            options: [
              'Memory-aware algorithms',
              'Communication-hiding techniques',
              'Load balancing strategies',
              'Dynamic scheduling',
              'Hardware-specific tuning',
              'Auto-tuning',
              'Other (please specify)'
            ]
          }
        ]
      },
      // Future Library Interests
      {
        id: 'future-library-interests',
        title: 'Future Library Interests',
        type: 'section',
        children: [
          {
            id: 'libraries-to-evaluate',
            title: 'Libraries of Interest',
            type: 'checkbox',
            content: 'Which solver libraries would you like to evaluate or adopt? Select all that apply:',
            options: [
              'SLATE (Distributed dense linear algebra)',
              'DLA-Future (Next-gen dense solvers)',
              'PETSc / SLEPc (Sparse solvers and eigensolvers)',
              'MAGMA / cuSOLVER (GPU-accelerated)',
              'NTPoly / CheSS (Sparse solvers)',
              'STRUMPACK (Hierarchical solvers)',
              'Trilinos (Full solver suite)',
              'Other (please specify)'
            ]
          },
          {
            id: 'future-features',
            title: 'Desired Features',
            type: 'checkbox',
            content: 'What features would you like to see in future libraries? Select all that apply:',
            options: [
              'Better GPU support',
              'Mixed-precision capabilities',
              'Auto-tuning features',
              'Better distributed memory scaling',
              'Improved sparse matrix support',
              'Better integration with ML/AI',
              'Quantum computing support',
              'Other (please specify)'
            ]
          }
        ]
      }
    ]
  }
]; 