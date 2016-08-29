"use strict"

const {PNG} = require('pngJS')

module.exports = ({palette, numtiles, vsp0}) => {
  const convertToPng = () => {
    const columns = 20
    const width = columns * 16
    const height = Math.floor((numtiles + (columns - 1)) / columns) * 16
    const png = new PNG({width, height, filterType: -1})

    let offset = 0
    for (let tileIndex = 0; tileIndex < width * height; tileIndex++) {
      const tileColumn = tileIndex % 20
      const tileRow = Math.floor(tileIndex / 20)
      const tileX = tileColumn * 16
      const tileY = tileRow * 16

      const isBlank = tileIndex >= numtiles
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const absoluteX = tileX + x
          const absoluteY = tileY + y
          const paletteIndex = isBlank ? 0 : vsp0[offset++]
          const pngDataIndex = (absoluteY * width  * 4) + (absoluteX * 4)
          if (paletteIndex) {
            const r = palette[(paletteIndex * 3) + 0]
            const g = palette[(paletteIndex * 3) + 1]
            const b = palette[(paletteIndex * 3) + 2]
            png.data[pngDataIndex + 0] = r
            png.data[pngDataIndex + 1] = g
            png.data[pngDataIndex + 2] = b
            png.data[pngDataIndex + 3] = 0xff
          } else {
            png.data[pngDataIndex + 0] = 0xff
            png.data[pngDataIndex + 1] = 0
            png.data[pngDataIndex + 2] = 0xff
            png.data[pngDataIndex + 3] = 0
          }
        }
      }
    }

    return png
  }

  return {
    convertToPng
  }
}