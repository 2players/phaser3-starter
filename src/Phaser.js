require('original-phaser/polyfills')

var CONST = require('original-phaser/const')
var Extend = require('original-phaser/utils/object/Extend')

/**
 * @namespace Phaser
 */

var Phaser = {
  Animations: require('original-phaser/animations'),
  Cache: require('original-phaser/cache'),
  Cameras: {
    Scene2D: require('original-phaser/cameras/2d'),
  },
  // Core: require('original-phaser/core'),
  Class: require('original-phaser/utils/Class'),
  Data: require('original-phaser/data'),
  Device: require('original-phaser/device'),
  Display: require('original-phaser/display'),
  DOM: require('original-phaser/dom'),
  Events: require('original-phaser/events'),
  Game: require('original-phaser/core/Game'),
  GameObjects: {
    DisplayList: require('original-phaser/gameobjects/DisplayList'),
    UpdateList: require('original-phaser/gameobjects/UpdateList'),

    Image: require('original-phaser/gameobjects/image/Image'),
    Sprite: require('original-phaser/gameobjects/sprite/Sprite'),
    Text: require('original-phaser/gameobjects/text/static/Text'),
    DOMElement: require('original-phaser/gameobjects/unofficial/domelement/DOMElement'),
    HTML5Video: require('original-phaser/gameobjects/unofficial/html5video/HTML5Video'),
    CanvasVideo: require('original-phaser/gameobjects/unofficial/canvasvideo/CanvasVideo'),

    Factories: {
      Image: require('original-phaser/gameobjects/image/ImageFactory'),
      Sprite: require('original-phaser/gameobjects/sprite/SpriteFactory'),
      Text: require('original-phaser/gameobjects/text/static/TextFactory'),
      DOMElement: require('original-phaser/gameobjects/unofficial/domelement/DOMElementFactory'),
      HTML5Video: require('original-phaser/gameobjects/unofficial/html5video/HTML5VideoFactory'),
      CanvasVideo: require('original-phaser/gameobjects/unofficial/canvasvideo/CanvasVideoFactory'),
    },

    Creators: {
      Image: require('original-phaser/gameobjects/image/ImageCreator'),
      Sprite: require('original-phaser/gameobjects/sprite/SpriteCreator'),
      Text: require('original-phaser/gameobjects/text/static/TextCreator'),
    },
  },
  Loader: {
    File: require('original-phaser/loader/File'),
    FileTypes: {
      ImageFile: require('original-phaser/loader/filetypes/ImageFile'),
      AudioFile: require('original-phaser/loader/filetypes/AudioFile'),
      HTML5AudioFile: require('original-phaser/loader/filetypes/HTML5AudioFile'),
      AnimationJSONFile: require('original-phaser/loader/filetypes/AnimationJSONFile'),
    },

    LoaderPlugin: require('original-phaser/loader/LoaderPlugin'),
  },
  Input: require('original-phaser/input'),
  Plugins: require('original-phaser/plugins'),
  Scale: require('original-phaser/scale'),
  Scene: require('original-phaser/scene/Scene'),
  Scenes: require('original-phaser/scene'),
  Sound: require('original-phaser/sound'),
  Textures: require('original-phaser/textures'),
  Time: require('original-phaser/time'),
  Tweens: require('original-phaser/tweens'),
}

//   Merge in the consts

Phaser = Extend(false, Phaser, CONST)

//  Export it

module.exports = Phaser

global.Phaser = Phaser
