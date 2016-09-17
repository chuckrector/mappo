"use strict"

module.exports = (buffer) => {
  switch (buffer.length) {
  case 320 * 66:
    return 'v1boxraw'
  // could be a CHR with 10 or 15 frames; CHR usually <=5
  case 16 * 32 * 20:
  case 16 * 32 * 30:
    return 'v1chr'
  case 3 * 256:
    return 'v1pal'
  // could be a CHR with 9 frames; CHR usually <=5
  case 96 * 96:
    return 'v1cr2'
  case 9 * 16 * 95:
    return 'v1mainfnt'
  case 7 * 9 * 95:
    return 'v1smallfnt'
  // could be a CHR with 64 frames; CHR usually <=5
  case 256 * 256:
    return 'v1transtbl'
  }

  if (buffer.length % (32 * 32) === 0) {
    return 'v1speechspc'
  }

  return 'unknown'
}