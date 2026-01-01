import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/shifts/:path*',
        destination: 'http://127.0.0.1:8080/shifts/:path*',
      },
    ];
  },
};

export default nextConfig;
