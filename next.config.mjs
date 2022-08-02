/** @type {import('next').NextConfig} */
 const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'img1.idealista.com',
      'img2.idealista.com',
      'img3.idealista.com'
    ]
  }
}

// module.exports = nextConfig
export default nextConfig
