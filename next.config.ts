import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
};


module.exports = {
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/200/300"),
      new URL("https://s3.ir-thr-at1.arvanstorage.ir/rice-shop-product-images/type2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=7354cc12-d5a5-443c-a2e3-bcb0200e5e9f%2F20250611%2Fir-thr-at1%2Fs3%2Faws4_request&X-Amz-Date=20250611T081258Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&versionId=&X-Amz-Signature=8ae1db4bfc8fc4d9aba8639f74856261bdcfb6c66e35c3a6885a637873863eef"),
    ],
  }
}
