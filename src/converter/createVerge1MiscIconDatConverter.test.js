"use strict"

const expect = require(`expect`)
const createVerge1MiscIconDatConverter = require(`./createVerge1MiscIconDatConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert MISCICON.DAT to png
  const menuPointerTileWidth = 16
  const menuPointerTileHeight = 16
  const itemPointerTileWidth = 24
  const itemPointerTileHeight = 24
  const charptrTileWidth = 24
  const charptrTileHeight = 40
  const tileCount = 3
  const menuPointer = filler(menuPointerTileWidth * menuPointerTileHeight, 77)
  const itemPointer = filler(itemPointerTileWidth * itemPointerTileHeight, 88)
  const charptr = filler(charptrTileWidth * charptrTileHeight, 99)
  const converter = createVerge1MiscIconDatConverter({
    palette,
    tileCount,
    menuPointer,
    itemPointer,
    charptr,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(menuPointerTileWidth + itemPointerTileWidth + charptrTileWidth)
  expect(png.height).toBe(charptrTileHeight)
}