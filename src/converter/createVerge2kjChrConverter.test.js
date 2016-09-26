"use strict"

const expect = require(`expect`)
const createVerge2kjChrConverter = require(`./createVerge2kjChrConverter`)
const filler = require(`../filler`)

{
  // can convert chr image data to png
  const fxsize = 2
  const fysize = 3
  const totalframes = 6
  const imagedata = filler(fxsize * fysize * totalframes, 99)

  const converter = createVerge2kjChrConverter({
    fxsize,
    fysize,
    totalframes,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(fxsize * 5)
  expect(png.height).toBe(fysize * 2)
}