"use strict"

const expect = require(`expect`)
const createTileGridConverter = require(`./createTileGridConverter`)
const palette = require(`../dummyPalette`)
const colorDepth = require(`./colorDepth`)

  const oneTile = [
    128, 128, 128, 128, 128,
    128, 1, 0, 1, 128,
    128, 0, 1, 0, 128,
    128, 1, 0, 1, 128,
    128, 128, 128, 128, 128,
  ]

  const twoTile = [
    99, 99, 99, 99, 99,
    99, 77, 0, 77, 99,
    99, 0, 77, 0, 99,
    99, 77, 0, 77, 99,
    99, 99, 99, 99, 99,
  ]

  const tileCount = 3
  const tileWidth = 5
  const tileHeight = 5
  const columns = 2
  const oneTile32 = colorDepth.convert8to32({palette, raw8bitData: oneTile})
  const twoTile32 = colorDepth.convert8to32({palette, raw8bitData: twoTile})
  const raw32bitData = [...oneTile32, ...twoTile32, ...oneTile32]
{
  // can convert a tile list to a png grid

  const converter = createTileGridConverter({
    tileWidth,
    tileHeight,
    columns,
    tileCount,
    raw32bitData,
  })
  const png = converter.convertToPng()
  const width = columns * tileWidth
  const height = 2 * tileHeight

  expect(png.width).toBe(width)
  expect(png.height).toBe(height)

  const forEachTilePixel = (tileIndex, tileColumn, tileRow, callback) => {
    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        const absoluteX = (tileColumn * tileWidth) + x
        const absoluteY = (tileRow * tileHeight) + y
        const pngDataIndex = ((absoluteY * width) + absoluteX) * 4
        const offset32 = ((tileIndex * tileWidth * tileHeight) + (y * tileWidth) + x) * 4

        callback({offset32, pngDataIndex})
      }
    }
  }

  const expectFilledTile = (tileIndex, tileColumn, tileRow) => {
    forEachTilePixel(tileIndex, tileColumn, tileRow, ({offset32, pngDataIndex}) => {
      expect(png.data[pngDataIndex + 0]).toBe(raw32bitData[offset32 + 0])
      expect(png.data[pngDataIndex + 1]).toBe(raw32bitData[offset32 + 1])
      expect(png.data[pngDataIndex + 2]).toBe(raw32bitData[offset32 + 2])
      expect(png.data[pngDataIndex + 3]).toBe(raw32bitData[offset32 + 3])
    })
  }

  const expectEmptyTile = (tileIndex, tileColumn, tileRow) => {
    forEachTilePixel(tileIndex, tileColumn, tileRow, ({offset32, pngDataIndex}) => {
      expect(png.data[pngDataIndex + 0]).toBe(0xff)
      expect(png.data[pngDataIndex + 1]).toBe(0)
      expect(png.data[pngDataIndex + 2]).toBe(0xff)
      expect(png.data[pngDataIndex + 3]).toBe(0)
    })
  }

  expectFilledTile(0, 0, 0)
  expectFilledTile(1, 1, 0)
  expectFilledTile(2, 0, 1)
  expectEmptyTile(3, 1, 1)
}

{
  // process only row * columns tile indexes
  const converter = createTileGridConverter({
    tileWidth,
    tileHeight,
    columns,
    tileCount,
    raw32bitData,
  })

  let tileCountProcessed = 0
  converter.tileProcessor = () => tileCountProcessed++

  const png = converter.convertToPng()

  expect(tileCountProcessed).toBe(columns * 2)
}