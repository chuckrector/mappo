"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  let header
  let width = 0
  let height = 0

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
    } while (n < header.bytesPerLine)

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
    header = readFormat({
      reader,
      format: {
        manufacturer: T.u8,
        version: T.u8,
        encoding: T.u8,
        bitsPerPixel: T.u8,
        xmin: T.u16,
        ymin: T.u16,
        xmax: T.u16,
        ymax: T.u16,
        hres: T.u16,
        vres: T.u16,
        egaPalette: T.list(T.u8, 48),
        reserved: T.u8,
        colorPlanes: T.u8,
        bytesPerLine: T.u16,
        paletteType: T.u16,
        filler: T.list(T.u8, 58),
      }
    })

    width = header.xmax - header.xmin + 1
    height = header.ymax - header.ymin + 1

    const raw8bitData = readImage()

    reader.position = reader.length - (256 * 3)
    let palette = reader.readByteArray(256 * 3)

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