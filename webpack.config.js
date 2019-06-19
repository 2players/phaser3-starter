/* eslint-env node */
const path = require('path')
const { DefinePlugin } = require('webpack')
const merge = require('webpack-merge')
const setupIO = require('./webpack.parts/setup-io')
const setupDevServer = require('./webpack.parts/setup-dev-server')
const loadHTML = require('./webpack.parts/load-html')
const loadJS = require('./webpack.parts/load-js')
const loadJSX = require('./webpack.parts/load-jsx')
const loadMacro = require('./webpack.parts/load-macro')
const loadMedia = require('./webpack.parts/load-media')
const loadEnvs = require('./webpack.parts/load-envs')
const minify = require('./webpack.parts/minify')
const forceCaseSensitivePath = require('./webpack.parts/force-case-sensitive-path')
const generateSourceMaps = require('./webpack.parts/generate-sourcemap')
const cleanupBuilds = require('./webpack.parts/cleanup-builds')

function resolve(p) {
  const ROOT = path.resolve(__dirname)
  return path.resolve(ROOT, p)
}

const PATH_SRC = resolve('src')
const PATH_PHASER_ENTRY = resolve('node_modules/phaser/src/phaser.js')
const PATH_PHASER_SRC = resolve('node_modules/phaser/src')
const PATH_RES_SCANNER = resolve('src/util/res.val.js')
const PATH_RES_DIR = resolve('res')

const commonConfig = merge([
  setupIO(resolve('src/index.js'), resolve('dist')),
  loadJS({ include: [PATH_SRC] }),
  loadHTML(resolve('src/index.html')),
  loadMedia(),
  loadEnvs(['APP_ENV']),
  forceCaseSensitivePath(),
  {
    resolve: {
      alias: {
        // phaser: PATH_PHASER_ENTRY,
        res: PATH_RES_SCANNER,
        'res-dir': PATH_RES_DIR,
      },
    },
  },
  {
    module: {
      rules: [
        {
          test: PATH_RES_SCANNER,
          exclude: /node_modules/,
          use: {
            loader: 'val-loader',
            options: {
              basedir: './res',
            },
          },
        },
      ],
    },
  },
  {
    plugins: [
      new DefinePlugin({
        'typeof WEBGL_RENDERER': JSON.stringify(true),
        'typeof CANVAS_RENDERER': JSON.stringify(true),
        'typeof EXPERIMENTAL': JSON.stringify(false),
        'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
        'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
      }),
    ],
  },
])

function developmentConfig() {
  return merge([
    commonConfig,
    setupDevServer(),
    generateSourceMaps({ production: false }),
  ])
}

function productionConfig() {
  return merge([commonConfig, minify(), cleanupBuilds()])
}

/* eslint-disable-next-line */
module.exports = function(_, { mode } = { mode: 'NO_MODE' }) {
  const config =
    mode === 'production' ? productionConfig() : developmentConfig()

  return config
}
