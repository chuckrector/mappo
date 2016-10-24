"use strict"

const expect = require(`expect`)
const createVerge3VspConverter = require(`./createVerge3VspConverter`)
const filler = require(`../filler`)
const colorDepth = require(`./colorDepth`)
const palette = require(`../dummyPalette`)

{
  // can convert vsp tile data to png
  const converter = createVerge3VspConverter({
    tileCount: 21,
    tiles: filler(16 * 16 * 3 * 12),
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(16 * 20)
  expect(png.height).toBe(16 * 2)
}