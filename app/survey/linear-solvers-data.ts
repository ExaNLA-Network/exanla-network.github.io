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
              'ScaLAPACK',
              'SLATE',
              'cuSolverMp',
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
        ]
      },
      {
        id: 'sym-herm-benchmarking',
        title: 'Benchmarking Requirements',
        type: 'section',
        children: [
          {
            id: 'sym-herm-input-data-type',
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
            id: 'sym-herm-data-provision',
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