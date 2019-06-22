import Phaser from 'phaser'
import res from 'res'
import { Player, EnemyBig, EnemyMedium, EnemySmall } from '../Entities'

class Main extends Phaser.Scene {
  constructor() {
    super('Main')
  }

  preload() {
    this.load.spritesheet('spritesheet.player', res.url('spritesheet.player'), {
      frameWidth: 16,
      frameHeight: 24,
    })
    this.load.spritesheet(
      'spritesheet.enemy-small',
      res.url('spritesheet.enemy-small'),
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    )
    this.load.spritesheet(
      'spritesheet.enemy-medium',
      res.url('spritesheet.enemy-medium'),
      {
        frameWidth: 32,
        frameHeight: 16,
      }
    )
    this.load.spritesheet(
      'spritesheet.enemy-big',
      res.url('spritesheet.enemy-big'),
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    )
    this.load.spritesheet(
      'spritesheet.explosion',
      res.url('spritesheet.explosion'),
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    )
    this.load.spritesheet('spritesheet.laser', res.url('spritesheet.laser'), {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.audio('snd.explode0', res.url('snd.explode0'))
    this.load.audio('snd.explode1', res.url('snd.explode1'))
    this.load.audio('snd.laser', res.url('snd.laser'))
  }

  create() {
    this.prepareMultimedia()
    this.prepareController()

    this.createPlayer()
    this.createEnemies()

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
  }

  update() {
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
        this.player.shoot()
      } else {
        this.player.stopShooting()
      }
    }

    const enemies = this.enemies.getChildren()
    for (const enemy of enemies) {
      enemy.update()
      this.checkDestroy(enemy)
    }

    const enemyLasers = this.enemyLasers.getChildren()
    for (const laser of enemyLasers) {
      laser.update()
      this.checkDestroy(laser)
    }

    const playerLasers = this.playerLasers.getChildren()
    for (const laser of playerLasers) {
      laser.update()
      this.checkDestroy(laser)
    }
  }

  prepareMultimedia() {
    this.anims.create({
      key: 'animation.player',
      frames: this.anims.generateFrameNumbers('spritesheet.player', {
        frames: [2, 7],
      }),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: 'animation.enemy-small',
      frames: this.anims.generateFrameNumbers('spritesheet.enemy-small'),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: 'animation.enemy-medium',
      frames: this.anims.generateFrameNumbers('spritesheet.enemy-medium'),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: 'animation.enemy-big',
      frames: this.anims.generateFrameNumbers('spritesheet.enemy-big'),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: 'animation.explosion',
      frames: this.anims.generateFrameNumbers('spritesheet.explosion'),
      frameRate: 16,
      repeat: 0,
    })

    this.anims.create({
      key: 'animation.laser-player',
      frames: this.anims.generateFrameNumbers('spritesheet.laser', {
        frames: [2, 3],
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'animation.laser-enemy',
      frames: this.anims.generateFrameNumbers('spritesheet.laser', {
        frames: [0, 1],
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.sfx = {
      explosions: [
        this.sound.add('snd.explode0'),
        this.sound.add('snd.explode1'),
      ],
      laser: this.sound.add('snd.laser'),
    }
  }

  prepareController() {
    const { UP, DOWN, LEFT, RIGHT, SPACE } = Phaser.Input.Keyboard.KeyCodes
    this.keyUP = this.input.keyboard.addKey(UP)
    this.keyDOWN = this.input.keyboard.addKey(DOWN)
    this.keyLEFT = this.input.keyboard.addKey(LEFT)
    this.keyRIGHT = this.input.keyboard.addKey(RIGHT)
    this.keySPACE = this.input.keyboard.addKey(SPACE)
  }

  createPlayer() {
    const initialPosition = [
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
    ]
    this.player = new Player(this, ...initialPosition)
    this.playerLasers = this.add.group()
  }

  createEnemies() {
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
  }

  generateEnemy() {
    let enemy = null

    const position = [Phaser.Math.Between(0, this.game.config.width), 0]

    const random = Phaser.Math.Between(0, 15)
    if (random >= 10) {
      enemy = new EnemyBig(this, ...position)
    } else if (random >= 5) {
      enemy = new EnemyMedium(this, ...position)
    } else {
      enemy = new EnemySmall(this, ...position)
    }

    return enemy
  }

  getEnemiesByType(type) {
    const enemies = this.enemies.getChildren()
    return enemies.filter(enemy => {
      return enemy.getData('type') === type
    })
  }

  checkDestroy(entity) {
    if (
      entity &&
      (entity.x < -entity.displayWidth ||
        entity.x > this.game.config.width + entity.displayWidth ||
        entity.y < -entity.displayWidth * 4 ||
        entity.y > this.game.config.height + entity.displayHeight)
    ) {
      entity.onDestroy?.()
      entity.destroy()
    }
  }
}

export default Main
