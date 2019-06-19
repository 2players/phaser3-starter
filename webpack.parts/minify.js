/* eslint-env node */
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            comments: false,
            ecma: 5, // transpile all codes to ECMAScript 5
          },
        }),
      ],
    },
  }
}
