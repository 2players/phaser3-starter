/* eslint-env node */
const loadJS = ({ include, exclude } = {}) => ({
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
})

module.exports = loadJS
