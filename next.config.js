/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/social',
        destination: 'https://social.kuropen.org/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ja',
        destination: '/',
        permanent: false,
      }
    ]
  },
  reactStrictMode: true,
  images: {
    domains: [
    ]
  },
}

module.exports = nextConfig
