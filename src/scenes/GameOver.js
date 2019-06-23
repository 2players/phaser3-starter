import Phaser from 'phaser'

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver')
  }

  create() {
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
      .text(centerX, centerY + 150, 'RESTART', {
        fontFamily: 'Stacked Pixel',
        fontSize: 32,
        color: '#ffffff',
      })
      .setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', this.buttonDown, this)
      .on('pointerup', this.buttonUp, this)
      .on('pointerout', this.buttonUp, this)
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

export default GameOver
