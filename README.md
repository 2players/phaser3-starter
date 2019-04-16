# Phaser3 Starter

A Phaser3 Starter with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Structure

> Reference [here](https://github.com/jdotrjs/phaser-guides/blob/master/Basics/Part1.md).

Having a consistent approach to identifying where some code or asset should live doesn't magically improve your code. Bugs still happen and code is still messy but it does remove some of the load of navigating your codebase.

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

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Deploying Code

Put the contents of the `dist` folder in a publicly-accessible location.

## License

[MIT](https://2players.studio/licenses/MIT) © [2Players Studio](https://2players.studio/)
