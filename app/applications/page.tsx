import Image from 'next/image';
import { applicationCategories, applications } from './applications-data';

export type ApplicationCategoryValue = typeof applicationCategories[keyof typeof applicationCategories];

// Helper function to get category styles (similar to other pages)
function getCategoryStyle(category: ApplicationCategoryValue) {
  switch (category) {
    case applicationCategories.COMPUTATIONAL_CHEMISTRY:
      return 'bg-sky-100 text-sky-800';
    case applicationCategories.MATERIALS_SCIENCE:
      return 'bg-emerald-100 text-emerald-800';
    case applicationCategories.PHYSICS_SIMULATION:
      return 'bg-violet-100 text-violet-800';
    case applicationCategories.HIGH_PERFORMANCE_COMPUTING:
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Applications</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex gap-8">
                {/* Left side: Logo and Website */}
                <div className="flex-shrink-0 w-48 flex flex-col items-center">
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={application.logo}
                      alt={`${application.title} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a 
                    href={application.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm text-center"
                  >
                    Visit Website →
                  </a>
                </div>

                {/* Right side: Content */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-4">{application.title}</h2>
                  <p className="text-gray-600 mb-4">{application.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {application.categories.map((category) => (
                      <span
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(category)}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="prose max-w-none">
                    {application.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Category Distribution Section */}
      <div className="mt-16 pt-10 border-t border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Application Category Distribution</h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-500">
            Overview of application categorizations.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {allCategories.map((category) => (
            <div key={category} className={`p-4 rounded-lg shadow-md ${getCategoryStyle(category).replace('text-', 'bg-').replace('-800', '-100').replace('-100', '-50')} border border-gray-200`}>
              <h3 className={`text-lg font-medium ${getCategoryStyle(category).split(' ')[1]}`}>{category}</h3>
              <p className={`mt-1 text-3xl font-semibold ${getCategoryStyle(category).split(' ')[1]}`}>
                {categoryCounts[category] || 0}
              </p>
              <p className={`text-sm ${getCategoryStyle(category).split(' ')[1]} opacity-75`}>
                {categoryCounts[category] === 1 ? 'Application' : 'Applications'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 