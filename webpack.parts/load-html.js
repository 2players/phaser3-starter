/* eslint-env node */
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = (
  template = 'src/index.html',
  { filename } = { filename: 'index.html' }
) => {
  return {
    plugins: [
      new HTMLWebpackPlugin({
        template,
        filename,
        inject: false,
      }),
    ],
  }
}
