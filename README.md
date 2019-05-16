# Starter Phaser3

> Scaffold out a game supported by Phaser3.

## Features

- ES6 support via [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Structure

### `vendor/`

This directory contains any static code which isn't available through NPM, such as custom build of Phaser or CSS files.

### `res/`

This directory contains audios, spritesheets, XMLs, fonts, etc.

Note: There is scanner for resources in this starter. You can get url of one resource like this:

```js
import res from 'res'

const url = res.url('image.btn-play')
```

### `src/`

- `src/scenes/` - store scenes, per file per scene.
- `src/plugins/` - store plugins.
- `src/objects/` - store entities.
- `src/components/` - a collection of UI elements for displaying information or interact with the players.
- `src/util/` — helpers.

## Available Commands

| Command         | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

Just like writing general JavaScript project with Webpack.

## Deploying Code

Put the contents of the `dist` folder in a public location.

## License

[MIT](https://2players.studio/licenses/MIT) © [2Players Studio](https://2players.studio/)
