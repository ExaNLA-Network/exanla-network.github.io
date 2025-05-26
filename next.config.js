/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true,  // Required for static export
  },
  basePath: '',  // Empty basePath since we're using the organization's root domain
  trailingSlash: true, // Recommended for static exports
}

module.exports = nextConfig 