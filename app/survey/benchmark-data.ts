import { SurveySection } from './types';

export const benchmarkData: SurveySection[] = [
  {
    id: 'benchmark-operations',
    title: 'Benchmark Operations',
    description: 'This section is directly connected to your selections in the Numerical Linear Algebra (NLA) Operations section above.\n\n' +
                'For each operation below:\n' +
                '• You should ONLY select it if you selected the same operation in the NLA section above\n' +
                '• Selecting it means you want to benchmark this operation using:\n' +
                '  - The exact numerical properties you specified above\n' +
                '  - The matrix types and characteristics you described\n' +
                '  - Both the libraries you currently use AND those you\'re interested in trying\n' +
                '  - The performance requirements you indicated\n\n' +
                'The benchmarks will automatically incorporate all the details you provided above, ensuring they match your specific use cases.',
    questions: [
      // GEMM
      {
        id: 'benchmark-matrix-multiplication',
        title: 'Matrix-Matrix Multiplication (GEMM)',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'benchmark-gemm-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'gemm-input-data-type',
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
            id: 'gemm-data-provision',
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
          {
            id: 'gemm-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Standard Eigenvalue Problems
      {
        id: 'benchmark-standard-eigenvalue-problems',
        title: 'Standard Eigenvalue Problems (Ax = λx)',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'benchmark-symmetric-eigen',
            title: 'Symmetric/Hermitian',
            type: 'section',
            isSelectable: true,
            children: [
              {
                id: 'symmetric-eigen-matrix-sizes',
                title: 'Matrix Sizes to Benchmark',
                type: 'checkbox',
                content: 'Select all matrix sizes you want to benchmark:',
                options: [
                  'Small (< 1,000)',
                  'Medium (1,000 - 10,000)',
                  'Large (10,000 - 100,000)',
                  'Very Large (100,000 - 1,000,000)',
                  'Extreme (> 1,000,000)',
                  'Other (please specify):'
                ]
              },
              {
                id: 'symmetric-eigen-input-data-type',
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
                id: 'symmetric-eigen-data-provision',
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
              {
                id: 'symmetric-eigen-scaling-types',
                title: 'Scaling Studies',
                type: 'checkbox',
                content: 'Which types of scalability do you want to explore?',
                options: [
                  'Strong scaling (fixed problem size, increasing resources)',
                  'Weak scaling (problem size grows with resources)',
                  'Both strong and weak scaling',
                  'Not applicable',
                  'Other (please specify):'
                ]
              }
            ]
          },
          {
            id: 'benchmark-quasi-hermitian-eigen',
            title: 'Quasi-Hermitian (e.g., BSE, special block structure)',
            type: 'section',
            isSelectable: true,
            children: [
              {
                id: 'quasi-eigen-matrix-sizes',
                title: 'Matrix Sizes to Benchmark',
                type: 'checkbox',
                content: 'Select all matrix sizes you want to benchmark:',
                options: [
                  'Small (< 1,000)',
                  'Medium (1,000 - 10,000)',
                  'Large (10,000 - 100,000)',
                  'Very Large (100,000 - 1,000,000)',
                  'Extreme (> 1,000,000)',
                  'Other (please specify):'
                ]
              },
              {
                id: 'quasi-eigen-input-data-type',
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
                id: 'quasi-eigen-data-provision',
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
              {
                id: 'quasi-eigen-scaling-types',
                title: 'Scaling Studies',
                type: 'checkbox',
                content: 'Which types of scalability do you want to explore?',
                options: [
                  'Strong scaling (fixed problem size, increasing resources)',
                  'Weak scaling (problem size grows with resources)',
                  'Both strong and weak scaling',
                  'Not applicable',
                  'Other (please specify):'
                ]
              }
            ]
          },
          {
            id: 'benchmark-non-symmetric-eigen',
            title: 'Non-Symmetric/Non-Hermitian',
            type: 'section',
            isSelectable: true,
            children: [
              {
                id: 'non-symmetric-eigen-matrix-sizes',
                title: 'Matrix Sizes to Benchmark',
                type: 'checkbox',
                content: 'Select all matrix sizes you want to benchmark:',
                options: [
                  'Small (< 1,000)',
                  'Medium (1,000 - 10,000)',
                  'Large (10,000 - 100,000)',
                  'Very Large (100,000 - 1,000,000)',
                  'Extreme (> 1,000,000)',
                  'Other (please specify):'
                ]
              },
              {
                id: 'non-symmetric-eigen-input-data-type',
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
                id: 'non-symmetric-eigen-data-provision',
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
              {
                id: 'non-symmetric-eigen-scaling-types',
                title: 'Scaling Studies',
                type: 'checkbox',
                content: 'Which types of scalability do you want to explore?',
                options: [
                  'Strong scaling (fixed problem size, increasing resources)',
                  'Weak scaling (problem size grows with resources)',
                  'Both strong and weak scaling',
                  'Not applicable',
                  'Other (please specify):'
                ]
              }
            ]
          }
        ]
      },
      // Generalized Eigenvalue Problems
      {
        id: 'benchmark-generalized-eigenvalue-problems',
        title: 'Generalized Eigenvalue Problems (Ax = λBx)',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'gen-eigen-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'gen-eigen-input-data-type',
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
            id: 'gen-eigen-data-provision',
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
          {
            id: 'gen-eigen-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Cholesky Factorization
      {
        id: 'benchmark-cholesky',
        title: 'Cholesky Factorization',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'cholesky-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'cholesky-input-data-type',
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
            id: 'cholesky-data-provision',
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
          {
            id: 'cholesky-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // QR Factorization
      {
        id: 'benchmark-qr',
        title: 'QR Factorization',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'qr-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'qr-input-data-type',
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
            id: 'qr-data-provision',
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
          {
            id: 'qr-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Matrix Inversion
      {
        id: 'benchmark-matrix-inversion',
        title: 'Matrix Inversion (A⁻¹)',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'matrix-inversion-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'matrix-inversion-input-data-type',
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
            id: 'matrix-inversion-data-provision',
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
          {
            id: 'matrix-inversion-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Polynomial Filtering
      {
        id: 'benchmark-polynomial-filtering',
        title: 'Polynomial Filtering/Functions (p(A))',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'polynomial-filtering-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'polynomial-filtering-input-data-type',
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
            id: 'polynomial-filtering-data-provision',
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
          {
            id: 'polynomial-filtering-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      },
      // Linear System Solvers
      {
        id: 'benchmark-linear-solvers',
        title: 'Linear System Solvers',
        type: 'section',
        isSelectable: true,
        children: [
          {
            id: 'linear-solvers-matrix-sizes',
            title: 'Matrix Sizes to Benchmark',
            type: 'checkbox',
            content: 'Select all matrix sizes you want to benchmark:',
            options: [
              'Small (< 1,000)',
              'Medium (1,000 - 10,000)',
              'Large (10,000 - 100,000)',
              'Very Large (100,000 - 1,000,000)',
              'Extreme (> 1,000,000)',
              'Other (please specify):'
            ]
          },
          {
            id: 'linear-solvers-input-data-type',
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
            id: 'linear-solvers-data-provision',
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
          {
            id: 'linear-solvers-scaling-types',
            title: 'Scaling Studies',
            type: 'checkbox',
            content: 'Which types of scalability do you want to explore?',
            options: [
              'Strong scaling (fixed problem size, increasing resources)',
              'Weak scaling (problem size grows with resources)',
              'Both strong and weak scaling',
              'Not applicable',
              'Other (please specify):'
            ]
          }
        ]
      }
    ]
  }
]; 