"use strict"

const expect = require(`expect`)
const createVerge3ChrConverter = require(`./createVerge3ChrConverter`)
const filler = require(`../filler`)

{
  // can convert 24-bit chr image data to png
  const frameWidth = 2
  const frameHeight = 3
  const frameCount = 2
  const imagedata = filler(frameWidth * frameHeight * frameCount * 3, 99)

  const converter = createVerge3ChrConverter({
    bpp: 24,
    frameWidth,
    frameHeight,
    frameCount,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(frameWidth * 5)
  expect(png.height).toBe(frameHeight)
}

{
  // can convert 32-bit chr image data to png
  const frameWidth = 2
  const frameHeight = 3
  const frameCount = 2
  const imagedata = filler(frameWidth * frameHeight * frameCount * 4, 99)

  const converter = createVerge3ChrConverter({
    bpp: 32,
    frameWidth,
    frameHeight,
    frameCount,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(frameWidth * 5)
  expect(png.height).toBe(frameHeight)
}