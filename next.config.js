/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    const configCopy = { ...config };
    if (!isServer) configCopy.resolve.fallback.fs = false;
    return configCopy;
  },
  images: {
    domains: [
      "fakestoreapi.com",
      "mrmrscart.s3.ap-south-1.amazonaws.com",
      "dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com",
    ],
  },
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  reactStrictMode: false,
};
module.exports = nextConfig;
