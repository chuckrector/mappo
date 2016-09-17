"use strict"

module.exports = (buffer) => {
  if (buffer.length === 320 * 66) {
    return 'v1boxraw'
  } else if (buffer.length === 16 * 32 * 20 || buffer.length === 16 * 32 * 30) {
    return 'v1chr'
  } else if (buffer.length === 3 * 256) {
    return 'v1pal'
  } else if (buffer.length === 96 * 96) {
    return 'v1cr2'
  }

  return 'unknown'
}