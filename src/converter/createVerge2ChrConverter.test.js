"use strict"

const expect = require(`expect`)
const createVerge2ChrConverter = require(`./createVerge2ChrConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert chr image data to png
  const frameWidth = 2
  const frameHeight = 3
  const frameCount = 2
  const imagedata = filler(frameWidth * frameHeight * 2, 99)

  const converter = createVerge2ChrConverter({
    palette,
    frameWidth,
    frameHeight,
    frameCount,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(frameWidth * 5)
  expect(png.height).toBe(frameHeight)
}