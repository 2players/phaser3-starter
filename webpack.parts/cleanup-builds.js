/* eslint-env node */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (...args) => {
  return {
    plugins: [new CleanWebpackPlugin(...args)],
  }
}
