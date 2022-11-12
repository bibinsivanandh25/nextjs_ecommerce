/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "fakestoreapi.com",
      "mrmrscart.s3.ap-south-1.amazonaws.com",
      "dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com",
      "test-mrmrscart-assets.s3.ap-south-1.amazonaws.com",
    ],
  },
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  reactStrictMode: false,
};
module.exports = nextConfig;
