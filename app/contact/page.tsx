export default function ContactPage() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            Get in touch with the ExaNLA community
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          {/* Contact Information */}
          <div className="bg-[#003D66] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Contact Information</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-gray-200">
                    <a href="mailto:exanla@fz-juelich.de" className="text-white hover:text-gray-300 transition-colors duration-150">
                      exanla]at[fz-juelich.de
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-200">
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
    </div>
  );
} 