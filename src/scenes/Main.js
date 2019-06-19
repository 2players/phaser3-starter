import Phaser from 'phaser'
import res from 'res'
import { Player } from '../Entities'

class Main extends Phaser.Scene {
  constructor() {
    super('Main')
  }

  preload() {
    this.load.image('sprBg0', res.url('sprBg0'))

    this.load.image('sprBg1', res.url('sprBg1'))
    this.load.spritesheet('sprExplosion', res.url('sprExplosion'), {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('sprEnemy0', res.url('sprEnemy0'), {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.image('sprEnemy1', res.url('sprEnemy1'))
    this.load.spritesheet('sprEnemy2', res.url('sprEnemy2'), {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.image('sprLaserEnemy0', res.url('sprLaserEnemy0'))
    this.load.image('sprLaserPlayer', res.url('sprLaserPlayer'))
    this.load.spritesheet('sprPlayer', res.url('sprPlayer'), {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.audio('sndExplode0', res.url('sndExplode0'))
    this.load.audio('sndExplode1', res.url('sndExplode1'))
    this.load.audio('sndLaser', res.url('sndLaser'))
  }

  create() {
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    })
    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    })

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    }

    const x = this.game.config.width * 0.5
    const y = this.game.config.height * 0.5
    this.player = new Player(this, x, y, 'sprPlayer')

    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyDOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    )
    this.keyLEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    )
    this.keyRIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    )
    this.keySPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
  }

  update() {
    this.player.update()

    if (this.keyUP.isDown) {
      this.player.moveUp()
    } else if (this.keyDOWN.isDown) {
      this.player.moveDown()
    }

    if (this.keyLEFT.isDown) {
      this.player.moveLeft()
    } else if (this.keyRIGHT.isDown) {
      this.player.moveRight()
    }
  }
}

export default Main
