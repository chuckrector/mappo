"use strict"

module.exports = (buffer) => {
  switch (buffer.length) {
  // could be a CHR with 64 frames; CHR usually <=5
  // 65536
  case 256 * 256:
    return 'v1transtbl'
  // 21120
  case 320 * 66:
    return 'v1boxraw'
  // 15360
  case 16 * 32 * 30:
    return 'v1chr'
  // 13680
  case 9 * 16 * 95:
    return 'v1mainfnt'
  // could be a CHR with 10 or 15 frames; CHR usually <=5
  // 10240
  case 16 * 32 * 20:
    return 'v1chr'
  // could be a CHR with 9 frames; CHR usually <=5
  // 9216
  case 96 * 96:
    return 'v1cr2'
  // 5985
  case 7 * 9 * 95:
    return 'v1smallfnt'
  // 1793
  case 1 + (16 * 16) + (24 * 24) + (24 * 40):
    return 'v1miscicondat'
  // 768
  case 3 * 256:
    return 'v1pal'
  }

  if (buffer.length % (32 * 32) === 0) {
    return 'v1speechspc'
  }

  if (buffer.length > 1 && buffer.length % (16 * 16) === 1) {
    return 'v1itemicondat'
  }

  if (buffer.length >= 2 + (3 * 256) + 2 + 16 * 16) {
    const numtilesOffset = 2 + (3 * 256)
    const numtiles = buffer.readUInt16LE(numtilesOffset)
    const animsize = 2 * 4 * 100
    const tilesize = buffer.length - (numtilesOffset + 2) - animsize
    if (tilesize % (16 * 16) === 0) {
      return 'v1vsp'
    }
  }

  if (buffer.length > 0) {
    const version = buffer.readUInt8(0)
    if (version === 4) {
      return 'v1map'
    } else if (version === 2) {
      return 'v2chr'
    }
  }

  return 'unknown'
}