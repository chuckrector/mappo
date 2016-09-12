"use strict"

const expect = require('expect')
const createVerge1Cr2Converter = require('./createVerge1Cr2Converter')
const filler = require('../filler')
const palette = require('../dummyPalette')

{
  // can convert CR2 character portrait to png
  const tileWidth = 96
  const tileHeight = 96
  const chr2 = filler(tileWidth * tileHeight, 99)
  const converter = createVerge1Cr2Converter({
    palette,
    chr2
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth)
  expect(png.height).toBe(tileHeight)
}