// next.config.ts
import type { NextConfig } from "next";

// __dirname tidak ada di ES Modules
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
};

export default nextConfig;
