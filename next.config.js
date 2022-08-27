/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_AUTH: process.env.FIREBASE_AUTH,
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    SERVICE_ACCOUNT_KEY: process.env.SERVICE_ACCOUNT_KEY
  },
  images: {
    domains: ['img.icons8.com']
  }
}

module.exports = nextConfig
