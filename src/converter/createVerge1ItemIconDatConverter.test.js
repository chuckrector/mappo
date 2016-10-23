"use strict"

const expect = require(`expect`)
const createVerge1ItemIconDatConverter = require(`./createVerge1ItemIconDatConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert ITEMICON.DAT to png
  const tileWidth = 16
  const tileHeight = 16
  const tileCount = 21
  const tiles = filler(tileWidth * tileHeight * tileCount, 99)
  const converter = createVerge1ItemIconDatConverter({
    palette,
    tileCount,
    tiles
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth * 20)
  expect(png.height).toBe(tileHeight * 2)
}