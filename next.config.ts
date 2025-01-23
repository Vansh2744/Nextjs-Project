import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
