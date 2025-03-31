/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.lean-designer.tech', 
      'lean-designer.tech', 
      'containeer.vercel.app',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com'
    ],
  },
}

module.exports = nextConfig 