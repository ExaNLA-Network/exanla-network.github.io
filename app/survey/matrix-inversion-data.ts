import { SurveySection } from './types';

export const matrixInversionData: SurveySection[] = [
  {
    id: 'matrix-inversion',
    title: 'Matrix Inversion (A⁻¹)',
    description: 'Details about matrix inversion operations in your applications, including direct and implicit methods.',
    questions: [
      // Application Context
      {

            id: 'matrix-inversion-purpose-usecases',
            title: 'Purpose and Use Cases of Matrix Inversion',
            type: 'checkbox',
            content: 'For what purposes and in which specific operations do you use matrix inversion? Select all that apply:',
            options: [
              'Solving linear systems (Ax = b)',
              'Eigenvalue problem transformation (standard form)',
              'Shift-and-invert operations ((H-σI)⁻¹)',
              'Green\'s function calculation (ωI-H-Σ(ω))⁻¹',
              'Preconditioner construction (M⁻¹≈A⁻¹)',
              'Basis transformation/orthogonalization (e.g., Löwdin, S⁻¹/²)',
              'Density matrix construction/purification',
              'Poisson equation solving',
              'Kohn-Sham equation solving',
              'Effective Hamiltonian construction',
              'Other (please specify):'
            ]
          
        
      },
      // Matrix Properties
      {
        id: 'matrix-inversion-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'matrix-inversion-structure',
            title: 'Matrix Structure',
            type: 'checkbox',
            content: 'What is the structure of your matrices? Select all that apply:',
            options: [
              'Dense',
              'Sparse',
              'Block sparse',
              'Banded',
              'Block diagonal',
              'Toeplitz',
              'Low-rank updates (A + UCVᵀ)',
              'Other structured (please specify):'
            ]
          },
          {
            id: 'matrix-inversion-properties-mathematical',
            title: 'Mathematical Properties',
            type: 'checkbox',
            content: 'What mathematical properties do your matrices have? Select all that apply:',
            options: [
              'Hermitian/Symmetric',
              'Positive definite',
              'Indefinite',
              'Non-symmetric',
              'Ill-conditioned',
              'Singular/Nearly singular',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-inversion-size',
            title: 'Matrix Dimensions',
            type: 'multiple-choice',
            content: 'What are the typical dimensions of your matrices?',
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
      // Inversion Methods
      //{
      //  id: 'matrix-inversion-methods',
      //  title: 'Inversion Methods',
      //  type: 'section',
      //  children: [
      //    {
      //      id: 'matrix-inversion-direct-methods',
      //      title: 'Direct Methods',
      //      type: 'checkbox',
      //      content: 'Which direct matrix inversion methods do you use? Select all that apply:',
      //      options: [
      //        'LU decomposition (A = LU)',
      //        'Cholesky decomposition (A = LLᵀ)',
      //        'QR decomposition',
      //        'SVD-based methods',
      //        'Explicit inverse computation',
      //        'Batched/blocked direct methods',
      //        'Mixed-precision direct methods',
      //        'Other (please specify):'
      //      ]
      //    },
      //    {
      //      id: 'matrix-inversion-iterative-methods',
      //      title: 'Iterative Methods',
      //      type: 'checkbox',
      //      content: 'Which iterative matrix inversion methods do you use? Select all that apply:',
      //      options: [
      //        'Krylov subspace methods (e.g., GMRES, CG, MINRES, BiCGStab)',
      //        'Lanczos-based methods',
      //        'Chebyshev iteration',
      //        'Recursive polynomial expansion',
      //        'Density matrix purification (e.g., McWeeny, trace-correcting)',
      //        'Dyson equation solvers (iterative Green’s function methods)',
      //        'Other (please specify):'
      //      ]
      //    },
      //    {
      //      id: 'matrix-inversion-structured-methods',
      //      title: 'Structured/Special Matrix Methods',
      //      type: 'checkbox',
      //      content: 'Which structured or special matrix inversion methods do you use? Select all that apply:',
      //      options: [
      //        'Low-rank approximation methods',
      //        'Block/structured matrix methods',
      //        'Schur complement methods',
      //        'Sherman-Morrison-Woodbury formula',
      //        'Tensor decomposition methods',
      //        'Batched/blocked sparse methods',
      //        'Other (please specify):'
      //      ]
      //    },
      //  ]
      //},
      // Accuracy Requirements
      {
        id: 'matrix-inversion-accuracy',
        title: 'Accuracy Requirements',
        type: 'section',
        children: [
          {
            id: 'matrix-inversion-residual',
            title: 'Inverse Accuracy',
            type: 'multiple-choice',
            content: 'What accuracy do you require for the inverse (||AA⁻¹ - I||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'matrix-inversion-linear-system',
            title: 'Linear System Accuracy',
            type: 'multiple-choice',
            content: 'For linear systems, what relative residual do you require (||Ax - b||/||b||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          }
        ]
      },
      // Library Usage - Standard Dense
      // Section: Dense Linear Algebra Libraries
      {
        "id": "matrix-inversion-dense",
        "title": "Dense Linear Algebra Libraries",
        "type": "section",
        "children": [
          {
            "id": "dense-libs-used",
            "title": "Currently Used Libraries",
            "type": "checkbox",
            "content": "Which dense linear algebra libraries do you currently use?",
            "options": [
              "ScaLAPACK",
              "Elemental",
              "SLATE",
              "DPLASMA",
              "cuSolverMp",
              "Other (please specify):"
            ]
          },
          {
            "id": "dense-libs-interest",
            "title": "Interested in Using",
            "type": "checkbox",
            "content": "Which dense linear algebra libraries are you interested in exploring?",
            "options": [
              "ScaLAPACK",
              "Elemental",
              "SLATE",
              "DPLASMA",
              "cuSolverMp",
              "Other (please specify):"
            ]
          }
        ]
      },
      {
        "id": "matrix-inversion-sparse",
        "title": "Sparse or Iterative Solver Libraries",
        "type": "section",
        "children": [
          {
            "id": "sparse-libs-used",
            "title": "Currently Used Libraries",
            "type": "checkbox",
            "content": "Which sparse or iterative solvers are you currently using?",
            "options": [
              "PETSc",
              "Trilinos",
              "MUMPS",
              "SuperLU / SuperLU_DIST",
              "PARDISO",
              "CHOLMOD",
              "Eigen (sparse backend)",
              "AmgX (NVIDIA GPU)",
              "STRUMPACK",
              "Other (please specify):"
            ]
          },
          {
            "id": "sparse-libs-interest",
            "title": "Interested in Using",
            "type": "checkbox",
            "content": "Which sparse or iterative solvers are you interested in?",
            "options": [
              "PETSc",
              "Trilinos",
              "MUMPS",
              "SuperLU / SuperLU_DIST",
              "PARDISO",
              "CHOLMOD",
              "Eigen (sparse backend)",
              "AmgX (NVIDIA GPU)",
              "STRUMPACK",
              "Other (please specify):"
            ]
          }
        ]
      },
      {
        "id": "matrix-inversion-specialized",
        "title": "Specialized and Domain-Specific Libraries",
        "type": "section",
        "children": [
          {
            "id": "specialized-libs-used",
            "title": "Currently Used Libraries",
            "type": "checkbox",
            "content": "Which specialized libraries do you currently use for materials or quantum simulations?",
            "options": [
              "PEXSI (Selected Inversion for DFT)",
              "STRUMPACK (Hierarchical Solvers)",
              "H2Lib / HLIBpro (H-matrix methods)",
              "H2Opus (GPU-based hierarchical solvers)",
              "Quantum Chemistry Specific Libraries (e.g., Libint, Libxc)",
              "Domain-specific GPU libraries (e.g., custom Green’s function solvers)",
              "Other (please specify):"
            ]
          },
          {
            "id": "specialized-libs-interest",
            "title": "Interested in Using",
            "type": "checkbox",
            "content": "Which of these specialized libraries are you interested in using?",
            "options": [
              "PEXSI (Selected Inversion for DFT)",
              "STRUMPACK (Hierarchical Solvers)",
              "H2Lib / HLIBpro (H-matrix methods)",
              "H2Opus (GPU-based hierarchical solvers)",
              "Quantum Chemistry Specific Libraries (e.g., Libint, Libxc)",
              "Domain-specific GPU libraries (e.g., custom Green’s function solvers)",
              "Other (please specify):"
            ]
          }
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