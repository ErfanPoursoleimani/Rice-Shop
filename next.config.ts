import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
};


module.exports = {
  images: {
    remotePatterns: [
      /* {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }, */
      new URL("https://picsum.photos/200/300")
    ],
  }
}
