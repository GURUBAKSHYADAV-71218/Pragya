/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/exercises/distraction-drift", destination: "/exercises/attention-anchor", permanent: false },
      { source: "/exercises/study-restart", destination: "/exercises/focus-reset", permanent: false },
    ];
  },
};
export default nextConfig;
