import type { NextConfig } from 'next';
import path from 'path';

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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force Next.js to use the current directory as the root
  // to avoid confusion with parent directory lockfiles
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./Machine-Learning-Notebooks/**/*'],
    },
  },
};

// Trigger deployment at 2026-05-16
export default nextConfig;