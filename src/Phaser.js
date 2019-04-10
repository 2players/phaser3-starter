require('op/polyfills')

var CONST = require('op/const')
var Extend = require('op/utils/object/Extend')

/**
 * @namespace Phaser
 */

var Phaser = {
  Animations: require('op/animations'),
  Cache: require('op/cache'),
  Cameras: {
    Scene2D: require('op/cameras/2d'),
  },
  // Core: require('op/core'),
  Class: require('op/utils/Class'),
  Data: require('op/data'),
  Device: require('op/device'),
  Display: require('op/display'),
  DOM: require('op/dom'),
  Events: require('op/events'),
  Game: require('op/core/Game'),
  GameObjects: {
    DisplayList: require('op/gameobjects/DisplayList'),
    UpdateList: require('op/gameobjects/UpdateList'),

    Image: require('op/gameobjects/image/Image'),
    Sprite: require('op/gameobjects/sprite/Sprite'),
    Text: require('op/gameobjects/text/static/Text'),
    DOMElement: require('op/gameobjects/unofficial/domelement/DOMElement'),
    HTML5Video: require('op/gameobjects/unofficial/html5video/HTML5Video'),
    CanvasVideo: require('op/gameobjects/unofficial/canvasvideo/CanvasVideo'),

    Factories: {
      Image: require('op/gameobjects/image/ImageFactory'),
      Sprite: require('op/gameobjects/sprite/SpriteFactory'),
      Text: require('op/gameobjects/text/static/TextFactory'),
      DOMElement: require('op/gameobjects/unofficial/domelement/DOMElementFactory'),
      HTML5Video: require('op/gameobjects/unofficial/html5video/HTML5VideoFactory'),
      CanvasVideo: require('op/gameobjects/unofficial/canvasvideo/CanvasVideoFactory'),
    },

    Creators: {
      Image: require('op/gameobjects/image/ImageCreator'),
      Sprite: require('op/gameobjects/sprite/SpriteCreator'),
      Text: require('op/gameobjects/text/static/TextCreator'),
    },
  },
  Loader: {
    File: require('op/loader/File'),
    FileTypes: {
      ImageFile: require('op/loader/filetypes/ImageFile'),
      AudioFile: require('op/loader/filetypes/AudioFile'),
      HTML5AudioFile: require('op/loader/filetypes/HTML5AudioFile'),
      AnimationJSONFile: require('op/loader/filetypes/AnimationJSONFile'),
    },

    LoaderPlugin: require('op/loader/LoaderPlugin'),
  },
  Input: require('op/input'),
  Plugins: require('op/plugins'),
  Scale: require('op/scale'),
  Scene: require('op/scene/Scene'),
  Scenes: require('op/scene'),
  Sound: require('op/sound'),
  Textures: require('op/textures'),
  Time: require('op/time'),
  Tweens: require('op/tweens'),
}

//   Merge in the consts

Phaser = Extend(false, Phaser, CONST)

//  Export it

module.exports = Phaser

global.Phaser = Phaser
