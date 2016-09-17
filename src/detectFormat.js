"use strict"

module.exports = (buffer) => {
  switch (buffer.length) {
  case 320 * 66:
    return 'v1boxraw'
  case 16 * 32 * 20:
  case 16 * 32 * 30:
    return 'v1chr'
  case 3 * 256:
    return 'v1pal'
  case 96 * 96:
    return 'v1cr2'
  case 9 * 16 * 95:
    return 'v1mainfnt'
  case 7 * 9 * 95:
    return 'v1smallfnt'
  case 256 * 256:
    return 'v1transtbl'
  }

  if (buffer.length % (32 * 32) === 0) {
    return 'v1speechspc'
  }

  return 'unknown'
}