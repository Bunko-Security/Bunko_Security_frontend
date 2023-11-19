/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    SERVER_PORT: process.env.SERVER_PORT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.SERVER_DOMAIN,
        port: process.env.SERVER_PORT,
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
      },
    )

    return config
  },
}

module.exports = nextConfig
