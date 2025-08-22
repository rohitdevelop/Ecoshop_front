/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqomi.com",
      },
      {
        protocol: "https",
        hostname: "images.stockcake.com",
      },
      {
        protocol: "https",
        hostname: "www.benz-packaging.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
      {
        protocol: "https",
        hostname: "media-uk.landmarkshops.in",
      },
      {
        protocol: "https",
        hostname: "www.jiomart.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
