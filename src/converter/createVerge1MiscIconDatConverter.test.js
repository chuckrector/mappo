"use strict"

const expect = require('expect')
const createVerge1MiscIconDatConverter = require('./createVerge1MiscIconDatConverter')
const fill = require('lodash/fill')
const palette = require('../dummyPalette')

{
  // can convert MISCICON.DAT to png
  const menuptrTileWidth = 16
  const menuptrTileHeight = 16
  const itmptrTileWidth = 24
  const itmptrTileHeight = 24
  const charptrTileWidth = 24
  const charptrTileHeight = 40
  const numtiles = 3
  const menuptr = fill(Array(menuptrTileWidth * menuptrTileHeight), 77)
  const itmptr = fill(Array(itmptrTileWidth * itmptrTileHeight), 88)
  const charptr = fill(Array(charptrTileWidth * charptrTileHeight), 99)
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