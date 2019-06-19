/* eslint-env node */
const webpack = require('webpack')

// make it possible to use environment vars in our code
const loadEnvs = envs => {
  const maps = {}

  envs.forEach((env = []) => {
    const value = JSON.stringify(process.env[env] || '')
    maps[env] = value
  })

  const plugins = [new webpack.DefinePlugin(maps)]

  return {
    plugins,
  }
}

module.exports = loadEnvs
