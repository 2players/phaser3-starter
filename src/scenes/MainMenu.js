import Phaser from 'phaser'
import res from 'res'
import { ScrollingBackground } from '../Entities'

class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  preload() {
    this.load.webFont('Stacked Pixel', res.url('font.stacked-pixel'))
    this.load.image('image.bg0', res.url('image.bg0'))
    this.load.image('image.bg0', res.url('image.bg1'))

    this.load.image('sprBtnRestartHover', res.url('sprBtnRestartHover'))
    this.load.image('sprBtnRestartDown', res.url('sprBtnRestartDown'))
    this.load.audio('sndBtnOver', res.url('sndBtnOver'))
    this.load.audio('sndBtnDown', res.url('sndBtnDown'))
  }

  create() {
    const centerX = this.game.config.width / 2
    const centerY = this.game.config.width / 2

    this.add
      .text(centerX, centerY - 100, 'SPACE SHOOTER', {
        fontFamily: 'Stacked Pixel',
        fontSize: 60,
        color: '#000000',
      })
      .setStroke('#ffffff', 5)
      .setOrigin(0.5, 0)

    this.button = this.add
      .text(centerX, centerY + 100, 'PLAY', {
        fontFamily: 'Stacked Pixel',
        fontSize: 32,
        color: '#ffffff',
      })
      .setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', this.buttonDown, this)
      .on('pointerup', this.buttonUp, this)
      .on('pointerout', this.buttonUp, this)

    this.backgrounds = []
    for (var i = 0; i < 4; i++) {
      const bg = new ScrollingBackground(this, 'image.bg0', i * 10)
      this.backgrounds.push(bg)
    }
  }

  update() {
    const backgrounds = this.backgrounds
    for (const bg of backgrounds) {
      bg.update()
    }
  }

  buttonDown() {
    this.buttonPressed = true
    this.button.y += 5
  }

  buttonUp() {
    if (this.buttonPressed) {
      this.buttonPressed = false
      this.button.y -= 5

      this.scene.start('Main')
    }
  }
}

export default MainMenu
