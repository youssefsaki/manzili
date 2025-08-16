/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Remove deprecated devIndicators configuration
  experimental: {
    // Keep experimental features clean
  },
}

module.exports = nextConfig
