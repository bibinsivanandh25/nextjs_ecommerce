/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    const configCopy = { ...config };
    if (!isServer) configCopy.resolve.fallback.fs = false;
    return configCopy;
  },
};
module.exports = nextConfig;
