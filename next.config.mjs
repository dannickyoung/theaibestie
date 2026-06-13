/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonicalize old static URL -> the Next route
      { source: "/lesson-01.html", destination: "/lesson-01", permanent: true },
    ];
  },
};

export default nextConfig;
