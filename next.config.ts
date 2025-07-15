// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// __dirname tidak ada di ES Modules
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
