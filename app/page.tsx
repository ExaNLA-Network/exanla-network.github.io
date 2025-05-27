import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ExaNLA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Exascale Numerical Linear Algebra Collaboration
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-400">
              Advancing numerical linear algebra for exascale computing through collaborative research,
              development, and optimization of algorithms, libraries, and applications.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Applications Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Applications</h2>
                <p className="text-gray-600 mb-4">
                  Explore real-world applications of numerical linear algebra in scientific computing,
                  machine learning, and data analysis.
                </p>
                <Link
                  href="/applications"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Libraries Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Libraries</h2>
                <p className="text-gray-600 mb-4">
                  Discover high-performance numerical linear algebra libraries optimized for
                  exascale computing systems.
                </p>
                <Link
                  href="/libraries"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Benchmarks Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Benchmarks</h2>
                <p className="text-gray-600 mb-4">
                  View performance benchmarks and comparisons of numerical linear algebra
                  algorithms and implementations.
                </p>
                <Link
                  href="/benchmarks"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">About ExaNLA</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  The purpose of this committee is to define, oversee, and coordinate the core activities required 
                  to design and develop a high-performance, scalable, and portable dense Numerical Linear Algebra (NLA)
                  library optimized for modern distributed and accelerated computing environments.
                  As computational demands in scientific computing, data analytics, and machine learning continue to grow, 
                  the need for efficient, robust, and flexible NLA solutions has become critical. Our mission is to set 
                  the stage for delivering a state-of-the-art NLA library that leverages the capabilities of heterogeneous 
                  architectures—including GPUs, multi-core CPUs, and distributed memory systems—while providing a clean, 
                  extensible interface for a broad spectrum of users and applications.
                </p>

                <p>
                  The ExaNLA initiative will be guided by an open-source development model, fostering transparency, 
                  community engagement, and long-term sustainability. The committee will actively promote collaboration 
                  among experts in numerical analysis, software engineering, and high-performance computing from a broad 
                  range of academic institutions and national laboratories. 
                  The committee will play an advisory role in setting the technical direction and scope of the library, 
                  identifying key functionalities (e.g., factorizations, solvers, eigensolvers), and establishing best 
                  practices for parallelism, resilience, interoperability and performance portability. The committee 
                  supports the creation of working groups whose activities may include the study and design of existing 
                  and novel algorithms, the evaluation and integration of established and emerging programming models, 
                  the formulation of benchmarks and testing protocols, and the development of community-driven documentation 
                  and support strategies. Through this collaborative and inclusive approach, this committee aims to lay 
                  the groundwork for a next-generation NLA library that meets the evolving needs of research and industry alike. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Committee</h2>
            <p className="text-lg text-gray-600 mt-4">
              Meet the experts leading our exascale numerical linear algebra initiatives
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/committee"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View Committee
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
