import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // /about -> /about/index.html, which every static host serves without rewrites.
  trailingSlash: true,
  images: {
    // Photos are pre-optimised by `npm run images`; see components/ui/Photo.tsx.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
