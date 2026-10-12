/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The About page was merged into the home page.
      { source: "/about", destination: "/#about", permanent: true },
    ];
  },
};

export default nextConfig;
