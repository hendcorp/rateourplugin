import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from WordPress.org domains
    domains: ['ps.w.org', 's.w.org'],
  },
};

export default nextConfig;
