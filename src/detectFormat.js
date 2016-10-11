"use strict"

const createBufferReader = require(`./createBufferReader`)
const asset = require(`./asset`)
const isEqual = require(`lodash/isequal`)

module.exports = (buffer) => {
  let json
  try {
    json = JSON.parse(buffer)
  } catch (err) {
    // ignore
  }

  if (typeof json !== `undefined`) {
    if (typeof json === `object`) {
      if (
        json.signature &&
        json.signature.name &&
        typeof json.signature.version === `string`
      ) {
        switch (json.signature.name) {
          case `mappo tileset`: return `mappotileset`
          case `mappo map`: return `mappomap`
        }
      }
    }

    return `unknown`
  }

  switch (buffer.length) {
  // could be a CHR with 64 frames; CHR usually <=5
  // 65536
  case 256 * 256:
    return `v1transtbl`
  // 21120
  case 320 * 66:
    return `v1boxraw`
  // 15360
  case 16 * 32 * 30:
    return `v1chr`
  // 13680
  case 9 * 16 * 95:
    return `v1mainfnt`
  // could be a CHR with 10 or 15 frames; CHR usually <=5
  // 10240
  case 16 * 32 * 20:
    return `v1chr`
  // could be a CHR with 9 frames; CHR usually <=5
  // 9216
  case 96 * 96:
    return `v1cr2`
  // 5985
  case 7 * 9 * 95:
    return `v1smallfnt`
  // 1793
  case 1 + (16 * 16) + (24 * 24) + (24 * 40):
    return `v1miscicondat`
  // 768
  case 3 * 256:
    return `v1pal`
  }

  if (buffer.length % (32 * 32) === 0) {
    return `v1speechspc`
  }

  if (buffer.length >= 6) {
    const reader = createBufferReader({data: buffer})
    const signature = reader.readByteArray(6)
    if (isEqual(signature, [77, 65, 80, 249, 53, 0])) {
      return `v2map`
    } else if (isEqual(signature, [77, 65, 80, 249, 54, 0])) {
      return `v27map`
    }
  }

  const VSP_ANIMATIONS_SIZE = 4 * 2 * 100
  if (buffer.length >= 2 + 2 + VSP_ANIMATIONS_SIZE) {
    const reader = createBufferReader({data: buffer})
    const version = reader.readWord()
    if (version === 4 || version === 5) {
      const numTiles = reader.readWord()
      if (version === 4) {
        if (buffer.length === 2 + 2 + (16 * 16 * numTiles * 2) + VSP_ANIMATIONS_SIZE) {
          return 'v2kj4vsp'
        }
      } else {
        const compressedBufferLength = reader.readQuad()
        if (buffer.length === 2 + 2 + 4 + compressedBufferLength + VSP_ANIMATIONS_SIZE) {
          return 'v2kj5vsp'
        }
      }
    } else if (version === 6) {
      if (buffer.length >= 2 + 1 + 2 + 2 + 4 + 64 + 4 + VSP_ANIMATIONS_SIZE) {
        const bytesPerPixel = reader.readByte()
        if (bytesPerPixel === 1) {
          const tileWidth = reader.readWord()
          const tileHeight = reader.readWord()
          const numTiles = reader.readQuad()
          const description = reader.readStringFixed(64)
          const palette = reader.readByteArray(3 * 256)
          const transparentIndex = reader.readByte()
          const compressedBufferLength = reader.readQuad()
          if (
            buffer.length === (
              2 + 1 + 2 + 2 + 4 + 64 + (256 * 3) + 1 + 4 +
              compressedBufferLength + VSP_ANIMATIONS_SIZE
            )
          ) {
            return `v27vsp8bit`
          }
        } else if (bytesPerPixel === 4) {
          const tileWidth = reader.readWord()
          const tileHeight = reader.readWord()
          const numTiles = reader.readQuad()
          const description = reader.readStringFixed(64)
          const compressedBufferLength = reader.readQuad()
          const expectedLength = (
              2 + 1 + 2 + 2 + 4 + 64 + 4 +
              compressedBufferLength + VSP_ANIMATIONS_SIZE
            )
          if (
            // experiment/MRDOUGH/town.vsp is A-OK
            buffer.length === expectedLength ||
            // TODO(chuck): why 400 extra? experiment/DEFLATOR/tehvsp.vsp has it
            buffer.length === expectedLength + 400
          ) {
            return `v27vsp32bit`
          }
          reader.readByteArray(compressedBufferLength)
          reader.readWordArray(4 * 100)
        }
      }
    }
  }

  if (buffer.length > 0) {
    const reader = createBufferReader({data: buffer})
    const version = reader.readByte()
    if (version === 3 || version === 4) {
      const vspName = reader.readStringFixed(13)
      if (vspName.toLowerCase().includes(`.vsp`)) {
        return `v1map`
      } else if (buffer.length >= 1 + (11 * 2) + (4 * 4) + (2 * 4)) { // rough min
        try {
          asset.fromBuffer(buffer, asset.v2vsp, true/*rethrow*/)
          return `v2vsp`
        } catch (e) {
          return `v2kjchr`
        }
      }
    } else {
      const fxsize = reader.readWord()
      const fysize = reader.readWord()
      // TODO(chuck): Need a better heuristic here
      if (version === 2 && fxsize === 16 && fysize === 32) {
        return `v2chr`
      }
    }
  }

  if (buffer.length >= 4) {
    const signature = buffer.readUInt32LE(0)
    if (signature === 5392451) {
      return `v3chr`
    } else if (signature === 5264214) {
      return `v3vsp`
    }
  }

  if (buffer.length >= 6) {
    const reader = createBufferReader({data: buffer})
    const signature = reader.readStringFixed(6)
    if (signature === `V3MAP`) {
      return `v3map`
    }
  }

  if (buffer.length >= 2 + (3 * 256) + 2 + 16 * 16) {
    const numtilesOffset = 2 + (3 * 256)
    const numtiles = buffer.readUInt16LE(numtilesOffset)
    const animsize = 2 * 4 * 100
    const tilesize = buffer.length - (numtilesOffset + 2) - animsize
    if (tilesize % (16 * 16) === 0) {
      return `v1vsp`
    }
  }

  if (buffer.length > 1 && buffer.length % (16 * 16) === 1) {
    return `v1itemicondat`
  }

  return `unknown`
}