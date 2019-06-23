import Phaser from 'phaser'
import { ScrollingBackground } from '../Entities'

class Space extends Phaser.Scene {
  constructor() {
    super('Space')
  }

  create() {
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
}

export default Space
