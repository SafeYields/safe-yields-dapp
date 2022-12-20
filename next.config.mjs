/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    newNextLinkBehavior: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
