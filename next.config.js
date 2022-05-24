/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    const configCopy = { ...config };
    if (!isServer) configCopy.resolve.fallback.fs = false;
    return configCopy;
  },
  images: {
    domains: ["fakestoreapi.com"],
  },
};
module.exports = nextConfig;
