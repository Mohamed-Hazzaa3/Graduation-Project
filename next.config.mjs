/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mxtjdiiwaqlvzgsotows.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "http",
        hostname: "housing-sys.runasp.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // output: "export",
};
export default nextConfig;
