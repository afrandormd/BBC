import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    domains: [
      "res.cloudinary.com",
      "lzd-img-global.slatic.net",
      "google.com", // hanya jika Anda memang ambil gambar dari google.com langsung
    ],
  },
};

export default nextConfig;
