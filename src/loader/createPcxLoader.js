"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  let width = 0
  let height = 0
  let bytesPerLine = 0

  const readLine = () => {
    let line = []
    let c = 0
    let n = 0
    let run = 0
    do {
      c = reader.readByte()
      if ((c & 0xc0) === 0xc0) {
        run = c & 0x3f
        c = reader.readByte()
        for (let j = 0; j < run; j++) {
          line.push(c)
        }
        n += run
      } else {
        line.push(c)
        n++
      }
    } while (n < bytesPerLine)

    return line.slice(0, width) // for aligned rows longer than actual width
  }

  const readImage = () => {
    let raw8bitData = []
    for (let y = 0; y < height; y++) {
      raw8bitData.push(...readLine())
    }

    return raw8bitData
  }

  const load = () => {
    const manufacturer = reader.readByte()
    const version = reader.readByte()
    const encoding = reader.readByte()
    const bitsPerPixel = reader.readByte()
    const xmin = reader.readWord()
    const ymin = reader.readWord()
    const xmax = reader.readWord()
    const ymax = reader.readWord()
    const hres = reader.readWord()
    const vres = reader.readWord()
    const egaPalette = reader.readByteArray(48)
    const reserved = reader.readByte()
    const colorPlanes = reader.readByte()

    bytesPerLine = reader.readWord()

    const paletteType = reader.readWord()
    const filler = reader.readByteArray(58)

    width = xmax - xmin + 1
    height = ymax - ymin + 1

    const raw8bitData = readImage()

    reader.position = reader.length - (256 * 3)
    let palette = reader.readByteArray(256 * 3)
    for (let i = 0; i < palette.length; i++) {
      palette[i] = palette[i] >> 2
    }

    return {
      width,
      height,
      raw8bitData,
      palette,
    }
  }

  return {
    load
  }
}