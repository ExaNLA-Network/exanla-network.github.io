export default function ContactPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Get in touch with the ExaNLA community
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-2 text-base text-gray-500">
                  <a href="mailto:exanla@fz-juelich.de" className="text-blue-600 hover:text-blue-800">
                    exanla]at[fz-juelich.de
                  </a>
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <p className="mt-2 text-base text-gray-500">
                  Forschungszentrum Jülich GmbH<br />
                  Wilhelm-Johnen-Straße<br />
                  52428 Jülich<br />
                  Germany
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 