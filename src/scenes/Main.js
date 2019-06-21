import Phaser from 'phaser'
import res from 'res'
import { Player, GunShip, ChaserShip, CarrierShip } from '../Entities'

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
    this.playerLasers = this.add.group()

    this.enemies = this.add.group()
    this.enemyLasers = this.add.group()

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        const enemy = this.generateEnemy()
        if (enemy !== null) {
          this.enemies.add(enemy)
        }
      },
      callbackScope: this,
      loop: true,
    })

    // controls
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

  generateEnemy() {
    let enemy = null

    const random = Phaser.Math.Between(0, 10)
    const position = [Phaser.Math.Between(0, this.game.config.width), 0]

    const chaserShipTotal = this.getEnemiesByType('ChaserShip').length

    if (random >= 5 && chaserShipTotal < 5) {
      enemy = new ChaserShip(this, ...position)
    } else if (random >= 3) {
      enemy = new GunShip(this, ...position)
    } else {
      enemy = new CarrierShip(this, ...position)
    }

    if (enemy !== null) {
      const scale = Phaser.Math.Between(10, 20) * 0.1
      enemy.setScale(scale)
    }

    return enemy
  }

  getEnemiesByType(type) {
    const enemies = this.enemies.getChildren()
    return enemies.filter(enemy => {
      return enemy.getData('type') === type
    })
  }

  update() {
    this.player.update()

    const enemies = this.enemies.getChildren()
    for (const enemy of enemies) {
      enemy.update()
    }

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

    if (this.keySPACE.isDown) {
      this.player.setData('isShooting', true)
    } else {
      this.player.setData(
        'timerShootTick',
        this.player.getData('timerShootDelay') - 1
      )

      this.player.setData('isShooting', false)
    }
  }
}

export default Main
