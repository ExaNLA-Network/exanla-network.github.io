import { SurveySection } from './types';

export const qrData: SurveySection[] = [
  {
    id: 'qr-factorization',
    title: 'QR Factorization (A = QR)',
    description: 'Details about QR factorization usage in your applications.',
    questions: [
      // Application and Usage
      {
        id: 'qr-applications',
        title: 'Applications',
        type: 'section',
        children: [
          {
            id: 'qr-primary-use',
            title: 'Primary Use Case',
            type: 'checkbox',
            content: 'What are your main uses for QR factorization? Select all that apply:',
            options: [
              'Least squares problems',
              'Orthogonalization of vectors/matrices',
              'Rank determination',
              'SVD computation',
              'Linear system solving',
              'Eigenvalue problems',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-pivoting',
            title: 'Pivoting Requirements',
            type: 'multiple-choice',
            content: 'What type of pivoting do you need?',
            options: [
              'No pivoting needed',
              'Column pivoting (QRCP)',
              'Full pivoting',
              'Rank-revealing QR',
              'Varies by application'
            ]
          }
        ]
      },      
      // Matrix Properties
      {
        id: 'qr-matrix-structure',
        title: 'Matrix Structure',
        type: 'checkbox',
        content: 'What is the structure of your matrices for QR factorization? Select all that apply:',
        options: [
          'Dense',
          'Sparse',
          'Block Sparse',
          'Banded',
          'Block diagonal',
          'Toeplitz',
          'Hierarchical / Low-rank',
          'Other structured (please specify):'
        ]
      },
      {
        id: 'qr-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'qr-rank',
            title: 'Matrix Rank',
            type: 'multiple-choice',
            content: 'What is the typical rank property of your matrices?',
            options: [
              'Full rank',
              'Rank deficient (known rank)',
              'Rank deficient (unknown rank)',
              'Nearly rank deficient',
              'Varies by problem'
            ]
          },
          {
            id: 'qr-condition',
            title: 'Condition Number',
            type: 'multiple-choice',
            content: 'What is the typical condition number of your matrices?',
            options: [
              'Well-conditioned (< 10^3)',
              'Moderately conditioned (10^3 - 10^6)',
              'Ill-conditioned (10^6 - 10^9)',
              'Very ill-conditioned (> 10^9)',
              'Varies significantly'
            ]
          },
          {
            id: 'qr-scale-size',
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
          },
          {
            id: 'qr-aspect-ratio',
            title: 'Matrix Shape',
            type: 'multiple-choice',
            content: 'What is the typical shape of your matrices (m rows × n columns)?',
            options: [
              'Square (m = n)',
              'Tall and skinny (m >> n)',
              'Short and wide (m << n)',
              'Nearly square (m ≈ n)',
              'Varies by application'
            ]
          }
        ]
      },
      // Computation Requirements
      {
        id: 'qr-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'qr-compute-mode',
            title: 'What to Compute',
            type: 'checkbox',
            content: 'What do you need to compute? Select all that apply:',
            options: [
              'Q and R factors explicitly',
              'Q factor only',
              'R factor only',
              'QR factorization for least squares',
              'QR with column pivoting',
              'Compact/Economy QR (minimal Q factor)',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-q-handling',
            title: 'Q Factor Handling',
            type: 'multiple-choice',
            content: 'How do you need the Q factor?',
            options: [
              'Explicit Q matrix',
              'Q as Householder reflectors',
              'Q-vector products only',
              'Do not need Q',
              'Varies'
            ]
          }
        ]
      },
      // Accuracy Requirements
      {
        id: 'qr-accuracy',
        title: 'Accuracy Requirements',
        type: 'section',
        children: [
          {
            id: 'qr-orthogonality',
            title: 'Q Orthogonality',
            type: 'multiple-choice',
            content: 'What level of orthogonality do you require for Q (||Q^T Q - I||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'qr-factorization-accuracy',
            title: 'Factorization Accuracy',
            type: 'multiple-choice',
            content: 'What accuracy do you require for the factorization (||A - QR||/||A||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'qr-least-squares-residual',
            title: 'Least Squares Residual',
            type: 'multiple-choice',
            content: 'For least squares problems, what residual accuracy do you require (||Ax - b||/||b||)?',
            options: [
              'Low accuracy (10^-3)',
              'Medium accuracy (10^-6)',
              'High accuracy (10^-9)',
              'Very high accuracy (10^-12)',
              'Machine precision',
              'Not applicable'
            ]
          }
        ]
      },
      // Library Usage - Standard Dense
      {
        id: 'qr-nla-libraries-standard',
        title: 'Standard Dense Linear Algebra (CPU/GPU/Shared-Memory)',
        type: 'section',
        children: [
          {
            id: 'qr-nla-group-standard-used',
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
            id: 'qr-nla-group-standard-interested',
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
      // Library Usage - Distributed
      {
        id: 'qr-nla-libraries-distributed',
        title: 'Distributed-Memory Dense Linear Algebra',
        type: 'section',
        children: [
          {
            id: 'qr-nla-group-distributed-used',
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
              'cuSolverMp',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-nla-group-distributed-interested',
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
              'cuSolverMp',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Library Usage - Specialized
      {
        id: 'qr-nla-libraries-specialized',
        title: 'Specialized Libraries (Sparse/Structured/Hierarchical)',
        type: 'section',
        children: [
          {
            id: 'qr-nla-group-specialized-used',
            title: 'Currently Used Libraries',
            type: 'checkbox',
            content: 'Select all libraries you use for special matrix structures:',
            options: [
              'SuiteSparseQR (sparse QR)',
              'qr_mumps (parallel sparse QR)',
              'SPQR (SuiteSparse parallel QR)',
              'STRUMPACK (hierarchical matrices)',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-nla-group-specialized-interested',
            title: 'Interested in Using',
            type: 'checkbox',
            content: 'Which specialized libraries are you interested in using? Select all that apply:',
            options: [
              'SuiteSparseQR (sparse QR)',
              'qr_mumps (parallel sparse QR)',
              'SPQR (SuiteSparse parallel QR)',
              'STRUMPACK (hierarchical matrices)',
              'Other (please specify):'
            ]
          }
        ]
      }
    ]
  }
]; 