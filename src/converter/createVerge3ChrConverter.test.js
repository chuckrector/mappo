"use strict"

const expect = require('expect')
const createVerge3ChrConverter = require('./createVerge3ChrConverter')
const fill = require('lodash/fill')

{
  // can convert chr image data to png
  const fxsize = 2
  const fysize = 3
  const totalframes = 2
  const imagedata = fill(Array(fxsize * fysize * totalframes * 4), 99)

  const converter = createVerge3ChrConverter({
    fxsize,
    fysize,
    totalframes,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(fxsize * 5)
  expect(png.height).toBe(fysize)
}