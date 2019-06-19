import 'regenerator-runtime/runtime'

import Phaser from 'phaser'
import WebFontLoaderPlugin from './plugins/web-font-loader'

import env from './util/env'
import dc from './util/device-compatibility'

import Boot from './scenes/Boot'

if (env.isProduction()) {
  // remove useless reference of Phaser
  delete window.Phaser
}

dc.disableScroll()

const config = {
  type: Phaser.WEBGL,
  autoFocus: true,
  parent: 'game-container',
  scaleMode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  forceOrientation: true,
  banner: !env.isProduction(),
  width: 480,
  height: 640,
  backgroundColor: 0x000000,
  scene: [Boot],
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  plugins: {
    global: [
      {
        key: 'WebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
