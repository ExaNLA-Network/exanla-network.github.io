import { SurveySection } from './types';

export const symmetricHermitianData: SurveySection[] = [
  {
    id: 'symmetric-hermitian-eigenvalue',
    title: 'Symmetric/Hermitian Eigenvalue Problems',
    description: 'Details about symmetric/Hermitian eigenvalue problems in your library.',
    questions: [
      {
        id: 'sym-herm-physical-problem',
        title: 'Primary Use Cases',
        type: 'checkbox',
        content: 'What is the physical problem linked to the eigenvalue problem?',
        options: [
            'Kohn–Sham equations (standard DFT)',
            'GW quasiparticle calculations',
            'Bethe–Salpeter equation (Tamm-Dancoff approximation)',
            'Tight-binding models',
            'Other (please specify):'
        ]
      },
      {
        id: 'sym-herm-matrix-structure',
        title: 'Matrix Structure',
        type: 'checkbox',
        content: 'What is the structure of your symmetric/Hermitian matrices? Select all that apply:',
        options: [
          'Dense',
          'Sparse',
          'Block Sparse',
          'Tridiagonal/Banded',
          'Block tridiagonal/Block Diagonal',
          'Toeplitz',
          'Other (please specify):'
        ]
      },
      {
        id: 'sym-herm-matrix-properties',
        title: 'Matrix Properties',
        type: 'section',
        children: [
          {
            id: 'sym-herm-spd',
            title: 'Positive definiteness',
            type: 'multiple-choice',
            content: 'Is your matrix positive definite?',
            options: [
              'Always positive definite',
              'Usually positive definite',
              'Not positive definite',
              'Varies depending on the problem'
            ]
          },
          {
            id: 'sym-herm-diagonal-dominance',
            title: 'Diagonal dominance',
            type: 'multiple-choice',
            content: 'What best describes the diagonal dominance?',
            options: [
              'Strictly diagonally dominant',
              'Weakly diagonally dominant',
              'Not diagonally dominant',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-condition',
            title: 'Condition number',
            type: 'multiple-choice',
            content: 'How well-conditioned are your matrices (approximate condition number)?',
            options: [
              'Well-conditioned (< 10^3)',
              'Moderately conditioned (10^3 - 10^6)',
              'Ill-conditioned (10^6 - 10^9)',
              'Very ill-conditioned (> 10^9)',
              'Varies significantly'
            ]
          },
          {
            id: 'sym-herm-eigenvalue-distribution',
            title: 'Eigenvalue distribution',
            type: 'multiple-choice',
            content: 'How are your eigenvalues typically distributed?',
            options: [
              'Well-separated',
              'Clustered',
              'Mix of clustered and separated',
              'Scattered/unpredictable',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-scale-size',
            title: 'Problem Scale',
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
      {
        id: 'sym-herm-computation-requirements',
        title: 'Computation Requirements',
        type: 'section',
        children: [
          {
            id: 'sym-herm-eigenvalue-percentage',
            title: 'Percentage of eigenvalues',
            type: 'multiple-choice',
            content: 'What percentage of eigenvalues do you typically compute?',
            options: [
              'Less than 1%',
              '1-10%',
              '10-50%',
              '50-90%',
              '90-100%',
              'All eigenvalues',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-compute-mode',
            title: 'What to compute',
            type: 'multiple-choice',
            content: 'What do you typically need to compute?',
            options: [
              'Eigenvalues only',
              'Eigenvalues and eigenvectors',
              'Selected eigenvalues and eigenvectors',
              'Varies'
            ]
          },
          {
            id: 'sym-herm-eigenvalue-location',
            title: 'Eigenvalue location',
            type: 'multiple-choice',
            content: 'Which eigenvalues are most important to you?',
            options: [
              'Smallest eigenvalues',
              'Largest eigenvalues',
              'Eigenvalues near a target shif',
              'Eigenvalues in a specific range',
              'Interior eigenvalues',
              'All eigenvalues',
              'Varies'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-tolerance',
        title: 'Required tolerance/precision',
        type: 'section',
        children: [
          {
            id: 'sym-herm-residual-tolerance',
            title: 'Residual tolerance',
            type: 'multiple-choice',
            content: 'What residual tolerance do you require for ||Ax - λx||?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ]
          },
          {
            id: 'sym-herm-orthogonality-tolerance',
            title: 'Orthogonality tolerance',
            type: 'multiple-choice',
            content: 'What orthogonality tolerance do you require for eigenvectors?',
            options: [
              'Low (10^-3)',
              'Medium (10^-6)',
              'High (10^-9)',
              'Very high (10^-12)',
              'Machine precision'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-nla-libraries-hierarchical',
        title: 'NLA Library Usage',
        type: 'section',
        children: [
          {
            id: 'sym-herm-nla-group-standard',
            title: 'Standard Dense Linear Algebra (CPU/GPU/Shared-Memory)',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'LAPACK (including all variants: Netlib, oneMKL, commercial, open-source, etc.)',
              'MAGMA – GPU-accelerated dense linear algebra',
              'cuSOLVER / cuBLAS – NVIDIA libraries for GPU-based solvers',
              'rocSOLVER / rocBLAS – AMD GPU-accelerated dense linear algebra',
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-nla-group-distributed',
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
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-nla-group-iterative',
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
              'Other (please specify):'
            ]
          },
          {
            id: 'sym-herm-nla-group-highlevel',
            title: 'High-Level & Interface Libraries',
            type: 'checkbox',
            content: 'Select all that apply:',
            options: [
              'ELSI – Abstraction layer for eigenvalue solvers (e.g., used by SIESTA, FHI-aims)',
              'Other (please specify):'
            ]
          }
        ]
      },
      {
        id: 'sym-herm-interested-libraries',
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
        id: 'sym-herm-barriers-to-adoption',
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
]; 