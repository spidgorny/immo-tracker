/** @type {import('next').NextConfig} */
 const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'img1.idealista.com',
      'img2.idealista.com',
      'img3.idealista.com',
      'immo-tracker.s3.amazonaws.com',
      'immo-tracker.s3.eu-central-1.amazonaws.com'
    ]
  }
}

// module.exports = nextConfig
export default nextConfig
