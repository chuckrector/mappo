"use strict"

const expect = require(`expect`)
const createVerge1BoxRawConverter = require(`./createVerge1BoxRawConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert BOX.RAW text box to png
  const tileWidth = 320
  const tileHeight = 66
  const transparentBox = filler(tileWidth * tileHeight, 99)
  const converter = createVerge1BoxRawConverter({
    palette,
    transparentBox: Buffer.from(transparentBox)
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth)
  expect(png.height).toBe(tileHeight)
}