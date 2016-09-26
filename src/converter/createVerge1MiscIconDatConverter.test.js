"use strict"

const expect = require(`expect`)
const createVerge1MiscIconDatConverter = require(`./createVerge1MiscIconDatConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert MISCICON.DAT to png
  const menuptrTileWidth = 16
  const menuptrTileHeight = 16
  const itmptrTileWidth = 24
  const itmptrTileHeight = 24
  const charptrTileWidth = 24
  const charptrTileHeight = 40
  const numtiles = 3
  const menuptr = filler(menuptrTileWidth * menuptrTileHeight, 77)
  const itmptr = filler(itmptrTileWidth * itmptrTileHeight, 88)
  const charptr = filler(charptrTileWidth * charptrTileHeight, 99)
  const converter = createVerge1MiscIconDatConverter({
    palette,
    numtiles,
    menuptr,
    itmptr,
    charptr,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(menuptrTileWidth + itmptrTileWidth + charptrTileWidth)
  expect(png.height).toBe(charptrTileHeight)
}