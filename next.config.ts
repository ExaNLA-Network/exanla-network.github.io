/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ExaNLA-Website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ExaNLA-Website/' : '',
};

export default nextConfig;
