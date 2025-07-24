import { SurveySection } from './types';

export const generalizedSymmetricData: SurveySection[] = [
  {
    id: 'generalized-symmetric-eigenvalue',
    title: 'Generalized Symmetric Eigenvalue Problems',
    description: 'Details about generalized symmetric (Hermitian) eigenvalue problems of the form A x = λ B x, where B is symmetric positive definite (SPD) or Hermitian positive definite (HPD).',
    questions: [
      {
        id: 'gen-sym-matrix-structure',
        title: 'Matrix Structure',
        type: 'checkbox',
        content: 'What is the structure of your A and B matrices? (Select all that apply)',
        options: [
          'A is dense, B is dense',
          'A is sparse, B is sparse',
          'A is dense, B is sparse',
          'A is banded, B is banded',
          'A is block-structured, B is block-structured',
          'Other (please specify):'
        ]
      },
      {
        id: 'gen-sym-b-numerical-properties',
        title: 'Reduction to Standard Eigenproblem (using B)',
        type: 'section',
        children: [
          {
            id: 'gen-sym-reduction-needed',
            title: 'Reduction to Standard Eigenproblem',
            type: 'multiple-choice',
            content: 'Do you reduce the generalized problem to a standard eigenproblem using B’s factorization or inversion?',
            options: [
              'Yes, always',
              'Yes, sometimes (depends on solver or problem)',
              'No, solver works directly with generalized form (e.g., contour integration, FEAST, iterative solvers)',
              'Don\'t know / Not applicable'
            ]
          },
          {
            id: 'gen-sym-reduction-method',
            title: 'Reduction Method',
            type: 'multiple-choice',
            content: 'If you perform reduction of the generalized eigenproblem, which method do you use?',
            options: [
              'Cholesky factorization of B (B = LLᵗ or B = L*L)',
              'Approximate inverse of B (e.g., polynomial or iterative approximation)',
              'Other direct factorizations',
              'Not applicable / No reduction'
            ]
          }
        ]
      },
      {
        id: 'gen-sym-nla-libraries',
        title: 'NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'gen-sym-nla-standard-dense',
            title: 'Standard Dense Linear Algebra (CPU/GPU/Shared-Memory)',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'LAPACK (including all variants: Netlib, oneMKL, commercial, open-source, etc.)',
              'MAGMA – GPU-accelerated dense linear algebra',
              'cuSOLVER / cuBLAS – NVIDIA libraries for GPU-based solvers',
              'rocSOLVER / rocBLAS – AMD GPU-accelerated dense linear algebra',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-nla-distributed-dense',
            title: 'Distributed-Memory Dense Linear Algebra',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ScaLAPACK – Distributed dense eigenvalue solvers',
              'ELPA – Highly scalable symmetric eigensolvers',
              'EigenExa – Optimized for massively parallel architectures',
              'DLA-Future – Task-based dense eigensolvers for modern architectures',
              'SLATE – Successor to ScaLAPACK; GPU/CPU support, asynchronous',
              'Chameleon – Dense linear algebra for distributed/heterogeneous architectures',
              'DPLASMA – Distributed PLASMA for dense linear algebra',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-nla-iterative',
            title: 'Iterative Eigensolvers',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ARPACK – Shift-invert methods for symmetric eigenproblems',
              'SLEPc – Scalable iterative eigensolvers built on PETSc',
              'PRIMME – High-performance iterative solvers (e.g., Davidson, JDQMR)',
              'Anasazi – Part of Trilinos, supports block Davidson and Krylov methods',
              'ChASE – Chebyshev accelerated subspace iteration',
              'FEAST – Rational filter for non-Hermitian eigenvalue problems',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-nla-highlevel',
            title: 'High-Level & Interface Libraries',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'ELSI – Abstraction layer for eigenvalue solvers (e.g., used by SIESTA, FHI-aims)',
              'Other (please specify)'
            ]
          },
          {
            id: 'gen-sym-interested-libraries',
            title: 'Are there any NLA libraries you are interested in using (but have not yet adopted)?',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'LAPACK',
              'MAGMA',
              'cuSOLVER/cuBLAS',
              'rocSOLVER/rocBLAS',
              'ScaLAPACK',
              'ELPA',
              'EigenExa',
              'DLA-Future',
              'SLATE',
              'Chameleon',
              'DPLASMA',
              'ARPACK',
              'SLEPc',
              'PRIMME',
              'Anasazi',
              'ChASE',
              'FEAST',
              'ELSI',
              'Other (please specify):'
            ]
          },
          {
            id: 'gen-sym-barriers-to-adoption',
            title: 'If not using libraries of interest, what are the barriers to adoption?',
                type: 'checkbox',
                content: 'Select all that apply:',
                options: [
              'Integration effort too high',
              'Lacks GPU support',
              'Lacks parallelism or scalability',
              'Unclear documentation or support',
              'Incompatible license',
              'Not performance-portable (heterogeneous systems)',
              'Missing needed precision (e.g., complex/quad/half)',
              'Dependency overhead too large',
              'Stability or convergence issues in practice',
              'Other (please specify):'
            ]
          }          
        ]
      }
    ]
  }
]; 