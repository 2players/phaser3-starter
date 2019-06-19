/* eslint-env node */
const { getHash, isFileFlatEnabled } = require('./helper')

const prefix = isFileFlatEnabled() ? '' : 'medias/'
const use = {
  loader: 'file-loader',
  options: {
    name: `${prefix}[name]${getHash()}.[ext]`,
  },
}

const loadMedia = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|mp4|ts|m4a|mp3|wav|ogg|atlas|xml|txt|cfg|woff|woff2|eot|ttf|otf|fnt)$/,
        include,
        exclude,
        use,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        // fix error when loading JSON files in webpack 4
        // https://github.com/webpack-contrib/file-loader/issues/264
        test: /\.json$/,
        exclude: /package\.json/,
        type: 'javascript/auto',
        use,
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
    ],
  },
})

module.exports = loadMedia
