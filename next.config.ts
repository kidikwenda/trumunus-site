import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/trumunus-site',
  assetPrefix: '/trumunus-site/',
  trailingSlash: true,
};

export default nextConfig;