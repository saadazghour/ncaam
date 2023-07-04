/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Example: https://a.espncdn.com/i/teamlogos/ncaa/500/66.png
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.espncdn.com",
        port: "",
        // pathname: "/i/teamlogos/ncaa/500/*/*",
        pathname: "/i/teamlogos/ncaa/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    appDir: true,
    allowFutureImage: true,
  },
};

module.exports = nextConfig;
