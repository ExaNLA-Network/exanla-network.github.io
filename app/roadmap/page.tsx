'use client';

/* interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Delayed';
  date?: string;
}

interface Phase {
  id: string;
  title: string;
  overallStatus: 'Completed' | 'In Progress' | 'Planned' | 'Delayed';
  description?: string;
  milestones: Milestone[];
}

const projectPhases: Phase[] = [
  {
    id: 'phase1',
    title: 'Phase 1: Benchmarking Libraries',
    overallStatus: 'In Progress',
    description: 'This phase focuses on comprehensively benchmarking the featured numerical linear algebra libraries to establish performance baselines, compare capabilities, and identify areas for optimization.',
    milestones: [
      {
        id: 'm1.1',
        name: 'Define Standard Benchmark Suite',
        description: 'Establish a common set of problems, datasets, and metrics to be used across all featured libraries for fair and consistent performance comparison. This includes defining problem sizes, types of operations (e.g., dense solve, sparse eigenvalue), and key performance indicators (KPIs) like TFLOPS, time-to-solution, scaling efficiency, and memory usage.',
        status: 'Completed',
        date: 'Q4 2023',
      },
      {
        id: 'm1.2',
        name: 'Environment Setup & Library Installation',
        description: 'Prepare the target High-Performance Computing (HPC) environments. This involves installing and configuring all six featured libraries (ELPA, SLATE, MAGMA, ChASE, DLA-Future, EigenExa) and their dependencies on the selected supercomputers.',
        status: 'Completed',
        date: 'Q1 2024',
      },
      {
        id: 'm1.3',
        name: 'Execute Core Performance Benchmarks',
        description: 'Run the defined standard benchmark suite on all libraries across the target HPC systems. Focus on core operations like dense and sparse matrix operations, linear solvers, and eigenvalue solvers. Collect raw performance data.',
        status: 'In Progress',
        date: 'Ongoing - Target Q2 2024',
      },
      {
        id: 'm1.4',
        name: 'Scaling and Concurrency Tests',
        description: 'Perform strong and weak scaling studies for each library to evaluate their parallel efficiency on distributed memory systems and their ability to leverage multi-core/many-core architectures and GPU accelerators.',
        status: 'In Progress',
        date: 'Ongoing - Target Q3 2024',
      },
      {
        id: 'm1.5',
        name: 'Data Analysis and Visualization',
        description: 'Process, analyze, and interpret the collected benchmark data. Develop visualizations (charts, graphs) to effectively communicate performance comparisons, scaling behavior, and identify performance bottlenecks or strengths of each library.',
        status: 'Planned',
        date: 'Target Q3 2024',
      },
      {
        id: 'm1.6',
        name: 'Publish Initial Benchmark Results & Report',
        description: 'Prepare a comprehensive report summarizing the benchmarking methodology, results, and analysis. Publish key findings and interactive visualizations on the ExaNLA website\'s \"Benchmarks\" page.',
        status: 'Planned',
        date: 'Target Q4 2024',
      },
    ],
  },
];

const getStatusColor = (status: Milestone['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Planned':
      return 'bg-yellow-100 text-yellow-800';
    case 'Delayed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}; */

export default function Roadmap() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Project Roadmap</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Tracking the progress and future plans of the ExaNLA initiative.
          </p>
        </div>

        {/* <div className="mt-16 space-y-12">
          {projectPhases.map((phase) => (
            <div key={phase.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{phase.title}</h2>
              <p className={`text-sm font-medium mb-3 inline-block px-2 py-0.5 rounded-full ${getStatusColor(phase.overallStatus)}`}>
                Overall Status: {phase.overallStatus}
              </p>
              {phase.description && (
                <p className="text-gray-600 mb-6">{phase.description}</p>
              )}
              
              <div className="space-y-4">
                {phase.milestones.length > 0 ? (
                  phase.milestones.map((milestone) => (
                    <div key={milestone.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{milestone.name}</h3>
                          {milestone.date && (
                            <p className="text-xs text-gray-500">{milestone.date}</p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(milestone.status)}`}
                        >
                          {milestone.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Milestones for this phase will be detailed soon.</p>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
} 