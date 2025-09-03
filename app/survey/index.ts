import { SurveySection } from './types';
import { generalData } from './general-data';
import { symmetricHermitianData } from './symmetric-hermitian-data';
import { nonSymmetricData } from './non-symmetric-data';
import { bseData } from './bse-data';
import { generalizedSymmetricData } from './generalized-symmetric-data';
import { choleskyData } from './cholesky-data';
import { qrData } from './qr-data';
import { matrixInversionData } from './matrix-inversion-data';
import { matrixMultiplicationData } from './matrix-multiplication-data';
import { polynomialFilteringData } from './polynomial-filtering-data';
import { linearSolversData } from './linear-solvers-data';
//import { benchmarkData } from './benchmark-data';

// Combine all survey data
export const surveyData: SurveySection[] = [
  ...generalData,
  {
    id: 'nla-operations',
    title: 'Numerical Linear Algebra Operations and Benchmarks',
    description:'NLA operations used in your library. We will gather information about :\n\n' +
                '• Matrix properties (sizes, types, sparsity patterns)\n' +
                '• Current library usage and performance requirements\n' +
                '• Libraries you are interested in using in the future\n' +
                '• Specific algorithmic needs and constraints\n' +
                '• Benchmarking requirements and metrics\n\n' +
                '***This information helps us understand the computational patterns across different scientific domains and guides our development of optimized NLA libraries and benchmarks.***\n\n' +
                '⚠️ If your code has multiple distinct use cases with significantly different requirements, we encourage you to submit separate survey responses for each major use case. This helps us better understand the full range of your needs.\n\n' +
                '⚠️ Selection Guidance\n\n' +
                'We recommend selecting your top 3 most critical operations for benchmarking:\n' +
                '• Operations dominating your application performance\n' +
                '• Operations in your codes you want to optimize\n\n' +
                'You can select more if essential, but please prioritize your most important operations.',
    questions: [
      {
        id: 'matrix-multiplication',
        title: 'Matrix-Matrix Multiplication (GEMM)',
        type: 'section',
        children: matrixMultiplicationData[0].questions
      },      
      {
        id: 'standard-eigenvalue',
        title: 'Standard Eigenvalue Problems (Ax = λx)',
        type: 'section',
        children: [
          {
            id: 'symmetric-hermitian',
            title: 'Symmetric/Hermitian',
            type: 'section',
            children: symmetricHermitianData[0].questions
          },
          {
            id: 'quasi-hermitian-bse',
            title: 'Quasi-Hermitian (BSE) - Hψ = Eψ, where H = (A B; -B* -A*), A = A†, B = B^T',
            type: 'section',
            children: bseData[0].questions
          },
          {
            id: 'non-symmetric-hermitian',
            title: 'Non-symmetric/Non-Hermitian',
            type: 'section',
            children: nonSymmetricData[0].questions
          }
        ]
      },
      {
        id: 'generalized-eigenvalue',
        title: 'Generalized Eigenvalue Problems (Ax = λBx)',
        type: 'section',
        children: [
          {
            id: 'gen-symmetric-hermitian',
            title: 'Symmetric/Hermitian A, SPD B',
            type: 'section',
            isSelectable: true,
            children: generalizedSymmetricData[0].questions
          },
          {
            id: 'gen-other',
            title: 'Other',
            type: 'section',
            isSelectable: true,
            children: [
              {
                id: 'gen-other-specify',
                title: 'Please specify your generalized eigenvalue problem type',
                type: 'textarea',
                content: 'Describe the properties of your matrices A and B',
                showOnlyWhenParentSelected: true
              }
            ]
          }
        ]
      },
      {
        id: 'cholesky-factorization',
        title: 'Cholesky Factorization (A = LL^T)',
        type: 'section',
        children: choleskyData[0].questions
      },
      {
        id: 'qr-factorization',
        title: 'QR Factorization (A = QR)',
        type: 'section',
        children: qrData[0].questions
      },
      {
        id: 'matrix-inversion',
        title: 'Matrix Inversion (A⁻¹)',
        type: 'section',
        children: matrixInversionData[0].questions
      },
      {
        id: 'polynomial-filtering',
        title: 'Polynomial Filtering/Functions (p(A))',
        type: 'section',
        children: polynomialFilteringData[0].questions
      },
      {
        id: 'linear-system-solvers',
        title: 'Linear System Solvers',
        type: 'section',
        children: linearSolversData[0].questions
      },
      {
        id: 'other-nla-operation',
        title: 'Other NLA Operation',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'other-nla-operation-specify',
            title: 'Please specify your NLA operation',
            type: 'textarea',
            content: 'Describe your NLA operation, including:\n• Operation type and mathematical formulation\n• Matrix properties and characteristics\n• Performance requirements\n• Current implementation approach.\n\n This information will help us consider adding dedicated sections for frequently requested operations in future survey updates.',
            showOnlyWhenParentSelected: true
          }
        ]
      }
    ]
  },
  //{
  //  id: 'benchmark-section',
  //  title: 'Benchmarking Requirements',
  //  description: 'This section is directly connected to your selections in the Numerical Linear Algebra (NLA) Operations section above.\n\n' +
  //              'For each operation below:\n' +
  //              '• You should ONLY select it if you selected the same operation in the NLA section above\n' +
  //              '• Selecting it means you want to benchmark this operation using:\n' +
  //              '    ◦ The exact numerical properties you specified above\n' +
  //              '    ◦ The matrix types and characteristics you described\n' +
  //              '    ◦ Both the libraries you currently use AND those you\'re interested in trying\n' +
  //              '    ◦ The performance requirements you indicated\n\n' +
  //              'The benchmarks will automatically incorporate all the details you provided above, ensuring they match your specific use cases.',
  //  questions: benchmarkData[0].questions
  //}
];

// Re-export types for convenience
export type { SurveyQuestion, SurveySection } from './types'; 