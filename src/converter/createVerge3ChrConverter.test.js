"use strict"

const expect = require('expect')
const createVerge3ChrConverter = require('./createVerge3ChrConverter')
const filler = require('../filler')

{
  // can convert 24-bit chr image data to png
  const fxsize = 2
  const fysize = 3
  const totalframes = 2
  const imagedata = filler(fxsize * fysize * totalframes * 3, 99)

  const converter = createVerge3ChrConverter({
    bpp: 24,
    fxsize,
    fysize,
    totalframes,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(fxsize * 5)
  expect(png.height).toBe(fysize)
}

{
  // can convert 32-bit chr image data to png
  const fxsize = 2
  const fysize = 3
  const totalframes = 2
  const imagedata = filler(fxsize * fysize * totalframes * 4, 99)

  const converter = createVerge3ChrConverter({
    bpp: 32,
    fxsize,
    fysize,
    totalframes,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(fxsize * 5)
  expect(png.height).toBe(fysize)
}