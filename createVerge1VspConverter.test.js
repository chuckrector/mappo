"use strict"

const expect = require('expect')
const createVerge1VspConverter = require('./createVerge1VspConverter')
const fill = require('lodash/fill')
const fs = require('fs')

{
  // can convert vsp tile data to png

  let palette = []
  for (let i = 0; i < 256; i++) {
    const ii = Math.floor(i / 4)
    palette.push(...[ii, ii, ii])
  }

  palette[(1 * 3) + 0] = Math.floor(255 / 4)
  palette[(1 * 3) + 1] = 0
  palette[(1 * 3) + 2] = 0

  const oneTile = [
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
    128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
  ]

  const vsp0 = Array.prototype.concat(...fill(Array(21), oneTile))
  const numtiles = 21
  const converter = createVerge1VspConverter({
    palette,
    numtiles,
    vsp0,
  })
  const png = converter.convertToPng()
  const width = 16 * 20
  const height = 16 * 2

  expect(png.width).toBe(width)
  expect(png.height).toBe(height)

  const forEachTilePixel = (tileColumn, tileRow, callback) => {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const absoluteX = (tileColumn * 16) + x
        const absoluteY = (tileRow * 16) + y
        const paletteIndex = vsp0[offset++]
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
    const tileColumn = tileIndex % 20
    const tileRow = Math.floor(tileIndex / 20)

    expectFilledTile(tileColumn, tileRow)
  }

  for (let tileIndex = numtiles; tileIndex < 20 * 2; tileIndex++) {
    const tileColumn = tileIndex % 20
    const tileRow = Math.floor(tileIndex / 20)

    expectEmptyTile(tileColumn, tileRow)
  }
}