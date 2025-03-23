import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com'
    ],
  },
};

export default nextConfig;
