"use strict"

const expect = require(`expect`)
const createVerge2kjChrConverter = require(`./createVerge2kjChrConverter`)
const filler = require(`../filler`)

{
  // can convert chr image data to png
  const frameWidth = 2
  const frameHeight = 3
  const frameCount = 6
  const imagedata = filler(frameWidth * frameHeight * frameCount, 99)

  const converter = createVerge2kjChrConverter({
    frameWidth,
    frameHeight,
    frameCount,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(frameWidth * 5)
  expect(png.height).toBe(frameHeight * 2)
}