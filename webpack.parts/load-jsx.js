/* eslint-env node */
const loadJSX = ({ include, exclude } = {}) => ({
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include,
        exclude,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
})

module.exports = loadJSX
