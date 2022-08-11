/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    const configCopy = { ...config };
    if (!isServer) configCopy.resolve.fallback.fs = false;
    return configCopy;
  },
  images: {
    domains: ["fakestoreapi.com", "mrmrscart.s3.ap-south-1.amazonaws.com"],
  },
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/customer/home",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
