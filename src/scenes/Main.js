import Phaser from 'phaser'
import res from 'res'
import { Player, GunShip, CarrierShip } from '../Entities'

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

    this.physics.add.collider(this.playerLasers, this.enemies, function(
      laser,
      enemy
    ) {
      if (enemy) {
        enemy.onDestroy?.()
        enemy.explode(true)

        laser.destroy()
      }
    })

    this.physics.add.collider(this.player, this.enemies, function(
      player,
      enemy
    ) {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false)
        enemy.explode(true)
      }
    })

    this.physics.add.collider(this.player, this.enemyLasers, function(
      player,
      laser
    ) {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false)
        laser.destroy()
      }
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
      // enemy = new ChaserShip(this, ...position)
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
    // console.log(
    //   this.enemies.getLength(),
    //   this.enemyLasers.getLength(),
    //   this.playerLasers.getLength()
    // )

    if (!this.player.getData('isDead')) {
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

      if (this.keySPACE.isDown) {
        this.player.setData('isShooting', true)
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay')
        )

        this.player.setData('isShooting', false)
      }
    }

    const enemies = this.enemies.getChildren()
    for (const enemy of enemies) {
      enemy.update()

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayWidth * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          enemy.onDestroy?.()
          enemy.destroy()
        }
      }
    }

    const enemyLasers = this.enemyLasers.getChildren()
    for (const laser of enemyLasers) {
      laser.update()

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayWidth * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        laser.destroy()
      }
    }

    const playerLasers = this.playerLasers.getChildren()
    for (const laser of playerLasers) {
      laser.update()

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayWidth * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        laser.destroy()
      }
    }
  }
}

export default Main
