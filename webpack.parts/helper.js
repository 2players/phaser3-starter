/* eslint-env node */

function getPublicPath() {
  return process.env.W_PUBLIC_PATH || ''
}

function getHash() {
  return isFileHashEnabled() ? '.[hash:8]' : ''
}

function getContenthash() {
  return isFileHashEnabled() ? '.[contenthash:8]' : ''
}

function getChunkhash() {
  return isFileHashEnabled() ? '.[chunkhash:8]' : ''
}

function getEntryChunkhash() {
  return isProductionMode() ? '.[chunkhash:8]' : '.[hash]'
}

function isFileFlatEnabled() {
  return parseEnvValue(process.env.W_FILE_FLAT)
}

function isFileHashEnabled() {
  return parseEnvValue(process.env.W_FILE_HASH)
}

function isProductionMode() {
  return process.env.W_MODE === 'production'
}

function isCSS(filename) {
  return filename.endsWith('.css')
}

function toArray(data) {
  return data ? (Array.isArray(data) ? data : [data]) : []
}

function parseEnvValue(env) {
  let value

  switch (env) {
    case 'true':
      value = true
      break
    default:
      value = false
      break
  }

  return value
}

module.exports = {
  getPublicPath,
  getHash,
  getContenthash,
  getChunkhash,
  getEntryChunkhash,
  isFileFlatEnabled,
  isFileHashEnabled,
  isProductionMode,
  isCSS,
  toArray,
}
