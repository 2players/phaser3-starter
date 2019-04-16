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
  type: Phaser.AUTO,
  autoFocus: true,
  parent: 'game-container',
  scaleMode: Phaser.Scale.ENVELOP,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  forceOrientation: true,
  banner: !env.isProduction(),
  width: 1500,
  height: 750,
  backgroundColor: 0x000000,
  transparent: true,
  scene: [Boot],
  physics: {
    default: 'arcade',
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
