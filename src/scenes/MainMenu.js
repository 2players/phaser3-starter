import Phaser from 'phaser'
import res from 'res'

class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  preload() {
    this.load.image('sprBtnPlay', res.url('sprBtnPlay'))
    this.load.image('sprBtnPlayHover', res.url('sprBtnPlayHover'))
    this.load.image('sprBtnPlayDown', res.url('sprBtnPlayDown'))
    this.load.image('sprBtnRestart', res.url('sprBtnRestart'))
    this.load.image('sprBtnRestartHover', res.url('sprBtnRestartHover'))
    this.load.image('sprBtnRestartDown', res.url('sprBtnRestartDown'))
    this.load.audio('sndBtnOver', res.url('sndBtnOver'))
    this.load.audio('sndBtnDown', res.url('sndBtnDown'))
  }

  create() {
    this.scene.start('Main')
  }
}

export default MainMenu
