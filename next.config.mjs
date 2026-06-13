/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static lesson page at a clean URL (no .html)
      { source: "/lesson-01", destination: "/lesson-01.html" },
    ];
  },
  async redirects() {
    return [
      // Canonicalize: /lesson-01.html -> /lesson-01
      { source: "/lesson-01.html", destination: "/lesson-01", permanent: true },
    ];
  },
};

export default nextConfig;
