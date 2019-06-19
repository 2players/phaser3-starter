/* eslint-env node */
module.exports = function generateConfig(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
        // Transformation of ES6 module syntax will be handled by Webpack.
        // So, disable it here.
        modules: false,
      },
    ],
  ]

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
  ]

  return {
    presets,
    plugins,
  }
}
