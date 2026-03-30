import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.livinginsider.com" },
      { protocol: "https", hostname: "*.livinginsider.com" },
      { protocol: "https", hostname: "*.ddproperty.com" },
      { protocol: "https", hostname: "*.pgimgs.com" },
      { protocol: "https", hostname: "*.dotproperty.co.th" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
