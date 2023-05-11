/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  distDir: "build",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tinyurl.com",
      },
    ],
  },
};

module.exports = nextConfig;
