/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonicalize old static URL -> the Next route
      { source: "/lesson-01.html", destination: "/lesson-01", permanent: true },
      // Pack -> Kit rebrand (old URLs may be shared in DMs/reels)
      { source: "/packs", destination: "/kits", permanent: true },
      { source: "/starter-pack", destination: "/starter-kit", permanent: true },
      { source: "/assistant-pack", destination: "/assistant-kit", permanent: true },
    ];
  },
};

export default nextConfig;
