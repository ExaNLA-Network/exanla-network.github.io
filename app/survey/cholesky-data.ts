import { SurveySection } from './types';

export const choleskyData: SurveySection[] = [
  {
    id: 'cholesky-factorization',
    title: 'Cholesky Factorization of Overlap Matrix B',
    description: 'Details about the use of Cholesky factorization in reducing generalized symmetric eigenproblems to standard form.',
    questions: [
      // Mathematical and Structural Properties
      {
        id: 'cholesky-positive-definite',
        title: 'Positive Definiteness',
        type: 'multiple-choice',
        content: 'Is your matrix guaranteed to be positive definite? (A key requirement for Cholesky to succeed)',
        options: [
          'Always positive definite',
          'Usually positive definite, with some edge cases',
          'Not always — may be indefinite or near-singular',
          'Not sure'
        ]
      },
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
        content: 'What is the typical condition number of your matrix?',
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
      {
        id: 'cholesky-fillin-reordering',
        title: 'Fill-in and Reordering',
        type: 'multiple-choice',
        content: 'Do you use reordering strategies to reduce fill-in in sparse Cholesky?',
        options: [
          'Yes, minimum degree or nested dissection',
          'Yes, library-default ordering',
          'No, raw input structure',
          'Not applicable (dense matrices)',
          'Not sure'
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
      // Computation Requirements
      {
        id: 'cholesky-objectives',
        title: 'Computation Objectives',
        type: 'checkbox',
        content: 'What do you need from the Cholesky factorization?',
        options: [
          'Compute L only',
          'Compute L and Lᵗ',
          'Use L to solve linear systems (Ax = b)',
          'Use factorization for log-det or sampling',
          'Complete factorization + solve',
          'Other (please specify):'
        ]
      },
      {
        id: 'cholesky-solve-frequency',
        title: 'Solve Frequency',
        type: 'multiple-choice',
        content: 'How often do you solve systems after factorization?',
        options: [
          'Just once (e.g., one solve per factor)',
          'Occasionally (few solves per factor)',
          'Repeated solves (many right-hand sides)',
          'Varies'
        ]
      },
      // Required Accuracy
      {
        id: 'cholesky-residual-tolerance',
        title: 'Residual Tolerance (||Ax - b||)',
        type: 'multiple-choice',
        content: 'What residual tolerance do you require?',
        options: [
          'Low accuracy (10^-3)',
          'Medium accuracy (10^-6)',
          'High accuracy (10^-9)',
          'Very high accuracy (10^-12)',
          'Machine precision'
        ]
      },
      {
        id: 'cholesky-factorization-tolerance',
        title: 'Factorization Tolerance (Internal accuracy)',
        type: 'multiple-choice',
        content: 'What internal accuracy do you require for the factorization? (i.e., what is the acceptable relative error in the factorization:  ||A - L̃ L̃ᵗ|| / ||A|| )',
        options: [
          'Low accuracy (10^-3)',
          'Medium accuracy (10^-6)',
          'High accuracy (10^-9)',
          'Very high accuracy (10^-12)',
          'Machine precision'
        ]
      },
      // NLA Library Usage
      {
        id: 'cholesky-nla-libraries-standard',
        title: 'Standard Dense Linear Algebra (CPU/GPU/Shared-Memory)',
        type: 'section',
        children: [
          {
            id: 'cholesky-nla-group-standard-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'LAPACK (including all variants: Netlib, oneMKL, commercial, open-source, etc.)',
              'cuSOLVER / cuBLAS (NVIDIA GPU)',
              'rocSOLVER / rocBLAS (AMD GPU)',
              'MAGMA (GPU-accelerated LAPACK)',
              'cuSolverMg',
              'Other (please specify):'
            ]
          },
          {
            id: 'cholesky-nla-group-standard-interested',
            title: 'Interested in Using',
            type: 'checkbox',
            content: 'Which libraries are you interested in using? Select all that apply:',
            options: [
              'LAPACK (including all variants: Netlib, oneMKL, commercial, open-source, etc.)',
              'cuSOLVER / cuBLAS (NVIDIA GPU)',
              'rocSOLVER / rocBLAS (AMD GPU)',
              'MAGMA (GPU-accelerated LAPACK)',
              'cuSolverMg',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'cholesky-nla-libraries-distributed',
        title: 'Distributed-Memory Dense Linear Algebra',
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
            title: 'Interested in Using',
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
            title: 'Interested in Using',
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
      }
    ]
  }
]; 