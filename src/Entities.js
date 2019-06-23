import Phaser from 'phaser'

const { DYNAMIC_BODY } = Phaser.Physics.Arcade

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key)

    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, DYNAMIC_BODY)
    this.setData('type', type)
    this.setData('isDead', false)
  }

  playExplosionSound() {
    const index = Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)
    this.scene.sfx.explosions[index].play()
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setData('isDead', true)

      this.body.stop()
      this.body.destroy()
      this.onDestroy?.()

      this.playExplosionSound()
      this.play('animation.explosion')
      this.on(
        'animationcomplete',
        function() {
          if (canDestroy) {
            this.destroy()
          } else {
            this.setVisible(false)
          }
        },
        this
      )
    }
  }
}

export class Player extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.player', 'Player')
    this.play('animation.player')

    this.speed = 200
    this.shootDelay = 5
    this.shootTick = this.shootDelay
    this.isShooting = false
  }

  moveUp() {
    this.body.setVelocityY(-this.speed)
  }

  moveDown() {
    this.body.setVelocityY(this.speed)
  }

  moveLeft() {
    this.body.setVelocityX(-this.speed)
  }

  moveRight() {
    this.body.setVelocityX(this.speed)
  }

  shoot() {
    this.isShooting = true
  }

  stopShooting() {
    this.isShooting = false
    this.shootTick = this.shootDelay
  }

  update() {
    this.body.setVelocity(0, 0)

    const { width: gameWidth, height: gameHeight } = this.scene.game.config
    this.x = Phaser.Math.Clamp(this.x, 0, gameWidth)
    this.y = Phaser.Math.Clamp(this.y, 0, gameHeight)

    if (this.isShooting) {
      if (this.shootTick < this.shootDelay) {
        this.shootTick += 1
      } else {
        this.shootTick = 0

        const laser = new PlayerLaser(this.scene, this.x, this.y)
        this.scene.playerLasers.add(laser)
        this.scene.sfx.laser.play()
      }
    }
  }
}

export class EnemyBig extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.enemy-big', 'EnemyBig')
    this.play('animation.enemy-big')

    this.body.setVelocityY(Phaser.Math.Between(50, 100))
  }
}

export class EnemyMedium extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.enemy-medium', 'EnemyMedium')
    this.play('animation.enemy-medium')

    this.body.setVelocityY(Phaser.Math.Between(50, 100))

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        const laser = new EnemyLaser(this.scene, this.x, this.y)
        this.scene.enemyLasers.add(laser)
      },
      callbackScope: this,
      loop: true,
    })
  }

  onDestroy() {
    if (this.shootTimer) {
      this.shootTimer.remove()
    }
  }
}

export class EnemySmall extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.enemy-small', 'EnemySmall')
    this.play('animation.enemy-small')

    this.body.setVelocityY(Phaser.Math.Between(50, 100))

    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    }
    this.state = this.states.MOVE_DOWN
  }

  update() {
    const player = this.scene.player
    if (!player) return
    const { x, y } = this
    const { x: playerX, y: playerY } = player

    if (player.getData('isDead')) {
      this.state = this.states.MOVE_DOWN
    } else {
      const distance = Phaser.Math.Distance.Between(x, y, playerX, playerY)
      if (distance < 320) {
        this.state = this.states.CHASE
      }
    }

    if (this.state === this.states.MOVE_DOWN) {
      this.body.setVelocityX(0)
    }

    if (this.state === this.states.CHASE) {
      const dx = playerX - x
      const dy = playerY - y

      const angle = Math.atan2(dy, dx)
      const speed = 100
      this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    }
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.laser', 2)
    this.play('animation.laser-player')

    this.body.setVelocityY(-200)
  }
}

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spritesheet.laser', 0)
    this.play('animation.laser-enemy')

    this.body.setVelocityY(200)
  }
}

export class ScrollingBackground {
  constructor(scene, key, velocityY) {
    this.scene = scene
    this.key = key
    this.velocityY = velocityY
    this.layers = this.scene.add.group()

    this.createLayers()
  }

  createLayers() {
    for (let i = 0; i < 2; i++) {
      const layer = this.scene.add.sprite(0, 0, this.key)
      layer.x = layer.width * 0.5
      layer.y = layer.height * (0.5 - i)

      const flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1
      const flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1
      layer.setScale(flipX, flipY)
      layer.setDepth(-i)
      this.scene.physics.world.enableBody(layer, DYNAMIC_BODY)
      layer.body.velocity.y = this.velocityY
      this.layers.add(layer)
    }
  }

  update() {
    const layers = this.layers.getChildren()
    for (const layer of layers) {
      const isOffScreen = layer.y > 1.5 * layer.height
      if (isOffScreen) {
        layer.y = -0.5 * layer.height
      }
    }
  }
}
