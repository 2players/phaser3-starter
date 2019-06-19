import Phaser from 'phaser'

class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  create() {
    this.scene.start('Main')
  }
}

export default MainMenu
