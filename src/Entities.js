import Phaser from 'phaser'

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key)

    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0)
    this.setData('type', type)
    this.setData('isDead', false)
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player')

    this.setData('speed', 200)
    this.play('sprPlayer')

    this.setData('isShooting', false)
    this.setData('timerShootDelay', 10)
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1)
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed')
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed')
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed')
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed')
  }

  update() {
    this.body.setVelocity(0, 0)

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width)
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height)

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        const key = 'timerShootTick'
        const currentTimerShootTick = this.getData(key)
        this.setData(key, currentTimerShootTick + 1)
      } else {
        const laser = new PlayerLaser(this.scene, this.x, this.y)
        this.scene.playerLasers.add(laser)
        this.scene.sfx.laser.play()
        this.setData('timerShootTick', 0)
      }
    }
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'Chasership')

    this.body.velocity.y = Phaser.Math.Between(50, 100)
    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    }
    this.state = this.states.MOVE_DOWN
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      const { x, y } = this
      const { x: playerX, y: playerY } = this.scene.player

      const distance = Phaser.Math.Distance.Between(x, y, playerX, playerY)

      if (distance < 320) {
        this.state = this.states.CHASE
      }
    }

    if (this.state === this.states.CHASE) {
      const { x, y } = this
      const { x: playerX, y: playerY } = this.scene.player

      const dx = playerX - x
      const dy = playerY - y

      const angle = Math.atan2(dy, dx)
      const speed = 100
      this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    }

    const { x } = this
    const { x: playerX } = this.scene.player
    if (x < playerX) {
      this.angle -= 5
    } else {
      this.angle += 5
    }
  }
}

export class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy0', 'GunShip')
    this.play('sprEnemy0')
    this.body.velocity.y = Phaser.Math.Between(50, 100)

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        const laser = new EnemyLaser(this.scene, this.x, this.y)
        laser.setScale(this.scaleX)
        this.scene.enemyLasers.add(laser)
      },
      callbackScope: this,
      loop: true,
    })
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove()
      }
    }
  }
}

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2', 'Carriership')
    this.play('sprEnemy2')
    this.body.velocity.y = Phaser.Math.Between(50, 100)
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPlayer')
    this.body.velocity.y = -200
  }
}

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0')
    this.body.velocity.y = 200
  }
}
