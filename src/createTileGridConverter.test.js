"use strict"

"use strict"

const expect = require('expect')
const createTileGridConverter = require('./createTileGridConverter')
const fill = require('lodash/fill')
const fs = require('fs')
const palette = require('./dummyPalette')

  const oneTile = [
    128, 128, 128, 128, 128,
    128, 1, 0, 1, 128,
    128, 0, 1, 0, 128,
    128, 1, 0, 1, 128,
    128, 128, 128, 128, 128,
  ]

  const numtiles = 3
  const tileWidth = 5
  const tileHeight = 5
  const columns = 2
  const raw8bitData = Array.prototype.concat(...fill(Array(numtiles), oneTile))

{
  // can convert a tile list to a png grid

  const converter = createTileGridConverter({
    palette,
    tileWidth,
    tileHeight,
    columns,
    numtiles,
    raw8bitData,
  })
  const png = converter.convertToPng()
  const width = columns * tileWidth
  const height = 2 * tileHeight

  expect(png.width).toBe(width)
  expect(png.height).toBe(height)

  const forEachTilePixel = (tileColumn, tileRow, callback) => {
    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        const absoluteX = (tileColumn * tileWidth) + x
        const absoluteY = (tileRow * tileHeight) + y
        const paletteIndex = raw8bitData[offset++]
        const pngDataIndex = (absoluteY * width  * 4) + (absoluteX * 4)

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

  const expectEmptyTile = (tileColumn, tileRow) => {
    forEachTilePixel(tileColumn, tileRow, ({paletteIndex, pngDataIndex}) => {
      expect(png.data[pngDataIndex + 0]).toBe(0xff)
      expect(png.data[pngDataIndex + 1]).toBe(0)
      expect(png.data[pngDataIndex + 2]).toBe(0xff)
      expect(png.data[pngDataIndex + 3]).toBe(0)
    })
  }

  let offset = 0
  for (let tileIndex = 0; tileIndex < numtiles; tileIndex++) {
    const tileColumn = tileIndex % columns
    const tileRow = Math.floor(tileIndex / columns)

    expectFilledTile(tileColumn, tileRow)
  }

  for (let tileIndex = numtiles; tileIndex < columns * 2; tileIndex++) {
    const tileColumn = tileIndex % columns
    const tileRow = Math.floor(tileIndex / columns)

    expectEmptyTile(tileColumn, tileRow)
  }
}

{
  // process only row * columns tile indexes
  const converter = createTileGridConverter({
    palette,
    tileWidth,
    tileHeight,
    columns,
    numtiles,
    raw8bitData,
  })

  let numTilesProcessed = 0
  converter.tileProcessor = () => numTilesProcessed++

  const png = converter.convertToPng()

  expect(numTilesProcessed).toBe(columns * 2)
}