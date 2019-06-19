/* eslint-env node */
// JavaScript doesn't support macro. But, val-loader provides us a familiar
// functionality.
const loadMacro = ({ include, exclude } = {}) => ({
  resolve: {
    extensions: ['.val.js'],
  },
  module: {
    rules: [
      {
        test: /\.val\.js$/,
        include,
        exclude,
        use: {
          loader: 'val-loader',
        },
      },
    ],
  },
})

module.exports = loadMacro
