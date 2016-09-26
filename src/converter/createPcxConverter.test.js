"use strict"

const expect = require(`expect`)
const createPcxConverter = require(`./createPcxConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert PCX to PNG
  const tileWidth = 4
  const tileHeight = 4
  const raw8bitData = filler(tileWidth * tileHeight, 99)
  const converter = createPcxConverter({
    palette,
    tileWidth,
    tileHeight,
    raw8bitData,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth)
  expect(png.height).toBe(tileHeight)
}