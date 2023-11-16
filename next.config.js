/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
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
