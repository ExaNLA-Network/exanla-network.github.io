/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true, // Recommended for static exports
}

module.exports = nextConfig 