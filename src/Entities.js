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
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'Chasership')
    this.body.velocity.y = Phaser.Math.Between(50, 100)
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

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0')
    this.body.velocity.y = 200
  }
}