"use strict"

const expect = require('expect')
const createVerge2ChrConverter = require('./createVerge2ChrConverter')
const fill = require('lodash/fill')
const palette = require('../dummyPalette')

{
  // can convert chr image data to png
  const fxsize = 2
  const fysize = 3
  const totalframes = 2
  const imagedata = fill(Array(fxsize * fysize * 2), 99)

  const converter = createVerge2ChrConverter({
    palette,
    fxsize,
    fysize,
    totalframes,
    imagedata,
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(fxsize * 5)
  expect(png.height).toBe(fysize)
}