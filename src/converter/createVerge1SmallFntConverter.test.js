"use strict"

const expect = require('expect')
const createVerge1SmallFntConverter = require('./createVerge1SmallFntConverter')
const fill = require('lodash/fill')
const palette = require('../dummyPalette')

{
  // can convert SMALL.FNT font to png
  const tileWidth = 7
  const tileHeight = 9
  const numtiles = 95
  const fnt = fill(Array(tileWidth * tileHeight * numtiles))
  const converter = createVerge1SmallFntConverter({
    palette,
    fnt: Buffer.from(fnt)
  })

  const png = converter.convertToPng()

  // 19 * 5 == 95
  expect(png.width).toBe(tileWidth * 19)
  expect(png.height).toBe(tileHeight * 5)
}