"use strict"

const {PNG} = require('pngJS')

module.exports = ({palette, chrs}) => {
  const convertToPng = () => {
    const columns = 5
    const width = columns * 16
    const height = 6 * 32
    const numtiles = 30
    const png = new PNG({width, height})

    let offset = 0

    for (let tileIndex = 0; tileIndex < width * height; tileIndex++) {
      const tileColumn = tileIndex % columns
      const tileRow = Math.floor(tileIndex / columns)
      const tileX = tileColumn * 16
      const tileY = tileRow * 32
      const isBlank = tileIndex >= numtiles

      for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 16; x++) {
          const absoluteX = tileX + x
          const absoluteY = tileY + y
          const paletteIndex = isBlank ? 0 : chrs[offset++]
          const pngDataIndex = (absoluteY * width  * 4) + (absoluteX * 4)

          if (paletteIndex) {
            const r = palette[(paletteIndex * 3) + 0] * 4
            const g = palette[(paletteIndex * 3) + 1] * 4
            const b = palette[(paletteIndex * 3) + 2] * 4

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
