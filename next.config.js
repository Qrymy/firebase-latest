const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      /**
       * @note Only if create dummy data, comment out a line below.
       */
      { source: '/dummy', destination: '/', permanent: true },
    ]
  },
})
