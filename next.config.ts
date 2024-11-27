import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN
  }
  ,
  images: {
    domains: ['cdn.pixabay.com' , 'lh3.googleusercontent.com']
  }
};

export default nextConfig;
