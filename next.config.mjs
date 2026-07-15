/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (custom apex domain: deepakthayyil.online)
  output: "export",
  // Emit /about/index.html style paths so GitHub Pages serves clean URLs.
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
  // Apex custom domain => served from root, so no basePath/assetPrefix needed.
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
