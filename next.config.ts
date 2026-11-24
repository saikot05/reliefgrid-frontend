import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use Turbopack (stable in Next.js 16)
  experimental: {},

  // Proxy /api/* to backend during development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
