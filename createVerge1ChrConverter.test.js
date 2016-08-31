"use strict"

const expect = require('expect')
const createVerge1ChrConverter = require('./createVerge1ChrConverter')
const fill = require('lodash/fill')

{
  // can convert chr image data to png

  let palette = []
  for (let i = 0; i < 256; i++) {
    const ii = Math.floor(i / 4)
    palette.push(...[ii, ii, ii])
  }

  palette[(1 * 3) + 0] = Math.floor(255 / 4)
  palette[(1 * 3) + 1] = 0
  palette[(1 * 3) + 2] = 0

  const oneChr = [
    128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
  ]

  const chrs = Array.prototype.concat(...fill(Array(30), oneChr))
  const numtiles = 30
  const converter = createVerge1ChrConverter({
    palette,
    chrs,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(16 * 5)
  expect(png.height).toBe(32 * 6)

  const forEachTilePixel = (tileColumn, tileRow, callback) => {
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 16; x++) {
        const absoluteX = (tileColumn * 16) + x
        const absoluteY = (tileRow * 32) + y
        const paletteIndex = chrs[offset++]
        const pngDataIndex = (absoluteY * png.width  * 4) + (absoluteX * 4)

        callback({paletteIndex, pngDataIndex})
      }
    }
  }

  const expectFilledTile = (tileColumn, tileRow) => {
    forEachTilePixel(tileColumn, tileRow, ({paletteIndex, pngDataIndex}) => {
      if (paletteIndex) {
        const r = palette[(paletteIndex * 3) + 0] * 4
        const g = palette[(paletteIndex * 3) + 1] * 4
        const b = palette[(paletteIndex * 3) + 2] * 4

        expect(png.data[pngDataIndex + 0]).toBe(r)
        expect(png.data[pngDataIndex + 1]).toBe(g)
        expect(png.data[pngDataIndex + 2]).toBe(b)
        expect(png.data[pngDataIndex + 3]).toBe(0xff)
      } else {
        expect(png.data[pngDataIndex + 0]).toBe(0xff)
        expect(png.data[pngDataIndex + 1]).toBe(0)
        expect(png.data[pngDataIndex + 2]).toBe(0xff)
        expect(png.data[pngDataIndex + 3]).toBe(0)
      }
    })
  }

  let offset = 0
  for (let tileIndex = 0; tileIndex < numtiles; tileIndex++) {
    const tileColumn = tileIndex % 5
    const tileRow = Math.floor(tileIndex / 5)

    expectFilledTile(tileColumn, tileRow)
  }
}