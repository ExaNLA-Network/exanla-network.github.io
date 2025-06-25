import Image from 'next/image';
import { applicationCategories, applications } from './applications-data';

export type ApplicationCategoryValue = typeof applicationCategories[keyof typeof applicationCategories];

export default function ApplicationsPage() {
  // Calculate category distribution
  const categoryCounts = applications.reduce((acc, app) => {
    app.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<ApplicationCategoryValue, number>);

  const allCategories = Object.values(applicationCategories);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Applications</h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore our supported applications and libraries
          </p>
        </div>
      
        <div className="grid grid-cols-1 gap-8">
          {applications.map((application) => (
            <div key={application.id} className="bg-[#003D66] rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Logo and Website Section */}
                  <div className="flex flex-col items-center md:w-48">
                    <div className="w-32 h-32 relative mb-4">
                      <Image
                        src={application.logo}
                        alt={`${application.title} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <a 
                        href={application.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 text-sm text-center transition-colors duration-150"
                      >
                        Visit Website →
                      </a>
                      {application.repository && (
                        <a 
                          href={application.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-gray-300 text-sm text-center transition-colors duration-150 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-4">{application.title}</h2>
                    <p className="text-gray-200 mb-4">{application.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {application.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 rounded-full text-sm bg-gray-300 text-gray-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="prose prose-invert max-w-none">
                      {application.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-200 mb-4">
                          {paragraph.trim()}
                        </p>
                      ))}
                      <h3 className="text-lg font-medium text-white mb-2">Key Linear Algebra Components</h3>
                      <ul className="list-disc list-inside text-gray-200 space-y-1 mb-4">
                        {application.key_linalg_components.map((component, index) => (
                          <li key={index}>{component}</li>
                        ))}
                      </ul>
                      
                      {application.additional_linalg_info && (
                        <p className="text-gray-200 mb-4">
                          {application.additional_linalg_info}
                        </p>
                      )}                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Category Distribution Section */}
        <div className="mt-16 pt-10 border-t border-gray-300">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Application Category Distribution</h2>
            <p className="mt-4 text-xl text-gray-600">
              Overview of application categorizations
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCategories.map((category) => (
              <div key={category} className="bg-[#003D66] p-6 rounded-xl shadow-2xl">
                <h3 className="text-lg font-semibold text-white">{category}</h3>
                <p className="mt-2 text-3xl font-bold text-white">
                  {categoryCounts[category] || 0}
                </p>
                <p className="text-sm text-gray-200">
                  {categoryCounts[category] === 1 ? 'Application' : 'Applications'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 