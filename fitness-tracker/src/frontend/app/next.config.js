/**
 * Next.js configuration file for the Fitness Goal Tracker & Social Hub MVP.
 *
 * This file defines the Next.js setup and configurations for the frontend application.
 * It leverages Next.js's built-in features and some third-party packages to
 * optimize performance, handle routing, and integrate with other services.
 *
 * @see [Next.js Documentation](https://nextjs.org/docs)
 */

// Import necessary modules
const { i18n } = require('./i18n');
import type { NextConfig } from 'next';
import { join } from 'path';

// Define Next.js configuration object
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC for faster builds
  compiler: {
    styledComponents: true // For styled-components integration
  },
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'], // Add domains for external image sources
  },
  i18n: i18n,
  experimental: {
    appDir: true, // Enable App Router for improved routing and data fetching
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': join(__dirname, '../shared'), // Define alias for shared utils
      '@frontend': join(__dirname, '../frontend'), // Define alias for frontend components
      '@backend': join(__dirname, '../backend'), // Define alias for backend services
    };

    // Add any additional webpack configurations here

    return config;
  },
  // ... other configurations (e.g., serverRuntimeConfig, publicRuntimeConfig)
};

// Export the Next.js configuration object
export default nextConfig;