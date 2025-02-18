import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "www.hola.com",
      },
      {
        protocol: "https",
        hostname: "content.elmueble.com",
      },
      {
        protocol: "https",
        hostname: "vitakraft.es",
      },
    ],
  },
};

export default nextConfig;
