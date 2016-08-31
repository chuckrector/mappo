"use strict"

const {PNG} = require('pngJS')

module.exports = ({
  palette,
  tileWidth,
  tileHeight,
  columns,
  numtiles,
  raw8bitData,
}) => {
  const convertToPng = () => {
    const rows = Math.floor((numtiles + (columns - 1)) / columns)
    const width = columns * tileWidth
    const height = rows * tileHeight
    const png = new PNG({width, height})

    let offset = 0

    for (let tileIndex = 0; tileIndex < width * height; tileIndex++) {
      const tileColumn = tileIndex % columns
      const tileRow = Math.floor(tileIndex / columns)
      const tileX = tileColumn * tileWidth
      const tileY = tileRow * tileHeight
      const isBlank = tileIndex >= numtiles

      for (let y = 0; y < tileHeight; y++) {
        for (let x = 0; x < tileWidth; x++) {
          const absoluteX = tileX + x
          const absoluteY = tileY + y
          const paletteIndex = isBlank ? 0 : raw8bitData[offset++]
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
