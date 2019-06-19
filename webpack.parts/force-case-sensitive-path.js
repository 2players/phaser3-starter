/* eslint-env node */
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = () => {
  return {
    plugins: [new CaseSensitivePathsPlugin()],
  }
}
