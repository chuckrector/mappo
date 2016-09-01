"use strict"

const expect = require('expect')
const createVerge1MainFntConverter = require('./createVerge1MainFntConverter')
const fill = require('lodash/fill')
const palette = require('./dummyPalette')

{
  // can convert MAIN.FNT font to png
  const tileWidth = 9
  const tileHeight = 16
  const numtiles = 95
  const fnt2 = fill(Array(tileWidth * tileHeight * numtiles))
  const converter = createVerge1MainFntConverter({
    palette,
    fnt2: Buffer.from(fnt2)
  })

  const png = converter.convertToPng()

  // 19 * 5 == 95
  expect(png.width).toBe(tileWidth * 19)
  expect(png.height).toBe(tileHeight * 5)
}