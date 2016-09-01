"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1Cr2Converter = require('./createVerge1Cr2Converter')
const fill = require('lodash/fill')
const palette = require('../dummyPalette')

{
  // can convert CR2 character portrait to png
  const tileWidth = 96
  const tileHeight = 96
  const chr2 = fill(Array(tileWidth * tileHeight), 99)
  const converter = createVerge1Cr2Converter({
    palette,
    chr2
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth)
  expect(png.height).toBe(tileHeight)
}