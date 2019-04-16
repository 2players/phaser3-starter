/* eslint-env node */
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const base = require('./base')

let productionSettings = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  devtool: 'nosources-source-map',
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          output: {
            comments: false,
            ecma: 5, // transpile all codes to ECMAScript 5
          },
        },
      }),
    ],
  },
}

if (process.env.ANALYZE_BUNDLE) {
  productionSettings = merge(productionSettings, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        openAnalyzer: true,
      }),
    ],
  })
}

module.exports = merge(base, productionSettings)
