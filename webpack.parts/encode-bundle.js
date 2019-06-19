/* eslint-env node */
const EncodingPlugin = require('webpack-encoding-plugin')

module.exports = ({
  encoding = 'gb18030',
  test = /(\.js|\.html)($|\?)/i,
} = {}) => {
  return {
    plugins: [
      new EncodingPlugin({
        encoding,
        test,
      }),
    ],
  }
}
