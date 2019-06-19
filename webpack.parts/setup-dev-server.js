/* eslint-env node */
const setupDevServer = () => {
  return {
    devServer: {
      host: '0.0.0.0',
      compress: true,
    },
  }
}

module.exports = setupDevServer
