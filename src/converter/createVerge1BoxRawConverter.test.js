"use strict"

const expect = require(`expect`)
const createVerge1BoxRawConverter = require(`./createVerge1BoxRawConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert BOX.RAW text box to png
  const tileWidth = 320
  const tileHeight = 66
  const tbox = filler(tileWidth * tileHeight, 99)
  const converter = createVerge1BoxRawConverter({
    palette,
    tbox: Buffer.from(tbox)
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth)
  expect(png.height).toBe(tileHeight)
}