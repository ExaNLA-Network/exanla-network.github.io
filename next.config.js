/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Re-enable static HTML export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true, // Recommended for static exports
  // Disable static optimization for survey page
  experimental: {
    // This helps with dynamic content during static generation
    optimizePackageImports: ['react', 'react-dom'],
  },
}

module.exports = nextConfig 