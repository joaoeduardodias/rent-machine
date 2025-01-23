import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakeimg.pl",
      },
      {
        protocol: "https",
        hostname:
          "rent-machine.13b70d716c6d93b7d5b5e5d9fcc8c43e.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "pub-4b214694cfa741d2a76e839070270399.r2.dev",
      },
    ],
  },
};

export default nextConfig;
