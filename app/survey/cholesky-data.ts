import { SurveySection } from './types';

export const choleskyData: SurveySection[] = [
  {
    id: 'cholesky-factorization',
    title: 'Cholesky Factorization of Overlap Matrix B',
    description: 'Details about the use of Cholesky factorization in reducing generalized symmetric eigenproblems to standard form.',
    questions: [
      // Mathematical and Structural Properties
      //{
      //  id: 'cholesky-positive-definite',
      //  title: 'Positive Definiteness',
      //  type: 'multiple-choice',
      //  content: 'Is your matrix guaranteed to be positive definite? (A key requirement for Cholesky to succeed)',
      //  options: [
      //    'Always positive definite',
      //    'Usually positive definite, with some edge cases',
      //    'Not always — may be indefinite or near-singular',
      //    'Not sure'
      //  ]
      //},
      {
        id: 'cholesky-diagonal-dominance',
        title: 'Diagonal Dominance',
        type: 'multiple-choice',
        content: 'Is your matrix diagonally dominant? (Helps ensure SPD and numerical robustness)',
        options: [
          'Strictly diagonally dominant',
          'Weakly diagonally dominant',
          'Not diagonally dominant',
          'Varies by application/problem',
          'Not sure'
        ]
      },
      {
        id: 'cholesky-condition-number',
        title: 'Condition Number',
        type: 'multiple-choice',
        content: 'Is your matrix well-conditioned?',
        options: [
          'Well-conditioned (< 10^3)',
          'Moderately conditioned (10^3 – 10^6)',
          'Ill-conditioned (10^6 – 10^9)',
          'Very ill-conditioned (> 10^9)',
          'Varies widely / Not known'
        ]
      },
      {
        id: 'cholesky-sparsity-structure',
        title: 'Matrix Sparsity and Structure',
        type: 'multiple-choice',
        content: 'What is the structural format of your matrices for Cholesky factorization? (Impacts fill-in, performance, and algorithm choice)',
        options: [
          'Dense',
          'Sparse',
          'Block sparse',
          'Banded',
          'Block diagonal',
          'Toeplitz',
          'Hierarchical / Low-rank',
          'Other structured (please specify):'
        ]
      },
      // Matrix Size and Scaling
      {
        id: 'cholesky-matrix-size',
        title: 'Matrix Dimensions',
        type: 'multiple-choice',
        content: 'What are the typical matrix sizes you factorize?',
        options: [
          'Small (< 1,000)',
          'Medium (1,000 – 10,000)',
          'Large (10,000 – 100,000)',
          'Very large (100,000 – 1,000,000)',
          'Extreme (> 1,000,000)'
        ]
      },
      {
        id: 'cholesky-factorization-tolerance',
        title: 'Factorization Tolerance',
        type: 'multiple-choice',
        content: 'What internal accuracy do you require for the factorization?',
        options: [
          'Low accuracy (10^-3)',
          'Medium accuracy (10^-6)',
          'High accuracy (10^-9)',
          'Very high accuracy (10^-12)',
          'Machine precision'
        ]
      },
      {
        id: 'cholesky-nla-libraries-distributed',
        title: 'Distributed-Memory Dense NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'cholesky-nla-group-distributed-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'ELPA',
              'EigenExa',
              'DLA-Future',
              'Chameleon',
              'DPLASMA',
              'cuSoverMp',
              'Other (please specify):'
            ]
          },
          {
            id: 'cholesky-nla-group-distributed-interested',
            title: 'Interested in Using, but not currently using',
            type: 'checkbox',
            content: 'Which distributed libraries are you interested in using? Select all that apply:',
            options: [
              'ScaLAPACK',
              'SLATE',
              'ELPA',
              'EigenExa',
              'DLA-Future',
              'Chameleon',
              'DPLASMA',
              'cuSoverMp',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'cholesky-nla-libraries-specialized',
        title: 'Specialized Libraries (Sparse/Structured/Hierarchical)',
        type: 'section',
        children: [
          {
            id: 'cholesky-nla-group-specialized-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all libraries you use for special matrix structures:',
            options: [
              'CHOLMOD (SuiteSparse) - Sparse SPD',
              'MUMPS - Distributed sparse',
              'PaStiX - Distributed sparse',
              'SuperLU - Sparse direct',
              'PARDISO - Sparse direct',
              'STRUMPACK - Hierarchical/HSS matrices',
              'UMFPACK (SuiteSparse) - Sparse direct',
              'Other (please specify):'
            ]
          },
          {
            id: 'cholesky-nla-group-specialized-interested',
            title: 'Interested in Using, but not currently using',
            type: 'checkbox',
            content: 'Which specialized libraries are you interested in using? Select all that apply:',
            options: [
              'CHOLMOD (SuiteSparse) - Sparse SPD',
              'MUMPS - Distributed sparse',
              'PaStiX - Distributed sparse',
              'SuperLU - Sparse direct',
              'PARDISO - Sparse direct',
              'STRUMPACK - Hierarchical/HSS matrices',
              'UMFPACK (SuiteSparse) - Sparse direct',
              'Other (please specify):'
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