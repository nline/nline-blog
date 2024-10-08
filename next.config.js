// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      { hostname: '**.nline.io' },
      { hostname: '**.notion.so' },
      { hostname: '**.notionusercontent.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'pbs.twimg.com' },
      { hostname: 'abs.twimg.com' },
      { hostname: 's3.us-west-2.amazonaws.com' },
      { hostname: 'cdn.jsdelivr.net' }
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
})
