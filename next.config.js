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
      },
      {
        source: '/sitemap/:path*',
        destination: 'https://sitemap.kuropen.org/sitemap.xml',
        permanent: true,
      },
      {
        source: '/articles/:path',
        destination: 'https://pgn-old-blog-url.kuropen.workers.dev/articles/:path',
        permanent: true,
      },
      {
        source: '/blog/:path',
        destination: 'https://pgn-old-blog-url.kuropen.workers.dev/blog/:path',
        permanent: true,
      },
      {
        source: '/ja/posts/:path',
        destination: '/posts/:path',
        permanent: true,
      },
      {
        source: '/en/posts/:path',
        destination: '/posts/:path',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: [
      'imagedelivery.net'
    ]
  },
}

module.exports = nextConfig
