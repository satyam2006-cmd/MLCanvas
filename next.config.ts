import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'github.com',
      'images.unsplash.com',
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configure for Vercel deployment
  output: undefined, // Remove static export for server-side deployment
  trailingSlash: false,
};

// Export the config directly, we'll handle Sentry through environment variables
// You can enable Sentry by setting NEXT_PUBLIC_SENTRY_DSN in your environment
module.exports = nextConfig;