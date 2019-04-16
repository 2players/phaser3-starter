import Phaser from 'phaser'
import res from 'res'

class Boot extends Phaser.Scene {
  constructor() {
    super('BootGame')
  }

  init() {}

  preload() {
    this.load.webFont('Stacked Pixel', res.url('font.stacked-pixel'))
  }

  create() {
    this.load.image('btn-play', res.url('image.btn-play'))

    this.load.on('complete', () => {
      this.renderUI()
    })

    this.load.start()
  }

  update() {}

  renderUI() {
    const centerX = this.game.config.width / 2
    const centerY = this.game.config.height / 2

    this.add
      .image(centerX, centerY + 25, 'btn-play')
      .setScale(0.7)
      .setOrigin(0.5, 1)

    this.add
      .text(centerX, centerY + 50, 'HELLO WORLD', {
        fontFamily: 'Stacked Pixel',
        fontSize: 60,
        color: '#ffffff',
      })
      .setStroke('#000000', 14)
      .setOrigin(0.5, 0)
  }
}

export default Boot
