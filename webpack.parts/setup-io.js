/* eslint-env node */
const { getEntryChunkhash, getPublicPath } = require('./helper')

const setupIO = (entry, outputDir) => {
  const output = {
    path: outputDir,
    // Because [chunkhash] is not available in non-production environments,
    // so replace it with [hash].
    filename: `[name]${getEntryChunkhash()}.js`,
    publicPath: getPublicPath(),
  }

  const resolve = {
    /**
     * fix the problem of module resolution when using symbolic packages,
     * like `npm link` / `yarn link`.
     *
     * tell webpack not resolve symlinks to their symlinked location.
     */
    symlinks: false,
  }

  return {
    entry,
    output,
    resolve,
  }
}

module.exports = setupIO
