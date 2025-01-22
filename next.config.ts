import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com", "res.cloudinary.com"], // Add img.clerk.com to the list
  },
};

export default nextConfig;
