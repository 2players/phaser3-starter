/* eslint-env node */
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const base = require('./base')

module.exports = merge(base, {
  plugins: [
    new BundleAnalyzerPlugin({
      defaultSizes: 'gzip',
      analyzerPort: 10086,
      openAnalyzer: false,
    }),
  ],
})
