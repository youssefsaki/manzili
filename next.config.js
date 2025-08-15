/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Completely disable Next.js branding and indicators
  experimental: {
    // Disable all development indicators
    devIndicators: false,
  },
}

module.exports = nextConfig
