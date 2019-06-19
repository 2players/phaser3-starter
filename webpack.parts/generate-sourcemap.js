/* eslint-env node */
const generateSourcemap = ({ production }) => ({
  devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
})

module.exports = generateSourcemap
