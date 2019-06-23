import Phaser from 'phaser'
import res from 'res'

class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  preload() {
    this.load.webFont('Stacked Pixel', res.url('font.stacked-pixel'))
    this.load.image('image.bg0', res.url('image.bg0'))
    this.load.image('image.bg1', res.url('image.bg1'))
  }

  create() {
    this.scene.run('Space')
    this.scene.sendToBack('Space')

    const centerX = this.game.config.width / 2
    const centerY = this.game.config.height / 2

    this.add
      .text(centerX, centerY - 150, 'SPACE SHOOTER', {
        fontFamily: 'Stacked Pixel',
        fontSize: 60,
        color: '#000000',
      })
      .setStroke('#ffffff', 5)
      .setOrigin(0.5, 0)

    this.button = this.add
      .text(centerX, centerY + 150, 'PLAY', {
        fontFamily: 'Stacked Pixel',
        fontSize: 32,
        color: '#ffffff',
      })
      .setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', this.buttonDown, this)
      .on('pointerup', this.buttonUp, this)
      .on('pointerout', this.buttonUp, this)

    const howtoText = [
      'HOW TO PLAY',
      '',
      'MOVE: Arrow Keys',
      'SHOOT: Space',
    ].join('\n')

    this.add
      .text(centerX, centerY, howtoText, {
        fontFamily: 'Stacked Pixel',
        fontSize: 20,
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5)
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
