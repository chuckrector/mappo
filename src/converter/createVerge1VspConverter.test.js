"use strict"

const expect = require(`expect`)
const createVerge1VspConverter = require(`./createVerge1VspConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert vsp tile data to png
  const oneTile = [
    128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 128,
    128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
  ]

  const converter = createVerge1VspConverter({
    palette,
    numtiles: 21,
    vsp0: Array.prototype.concat(...filler(21, oneTile)),
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(16 * 20)
  expect(png.height).toBe(16 * 2)
}