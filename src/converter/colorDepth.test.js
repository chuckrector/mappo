"use strict"

const expect = require('expect')
const fill = require('lodash/fill')
const colorDepth = require('./colorDepth')

{
  // can convert 8-bit image data to 32-bit
  const palette = [0xff, 0, 0, 0, 0xff, 0, 0, 0, 0xff]
  const raw8bitData = [0, 1, 2, 1]
  const raw32bitData = [
    palette[0], palette[1], palette[2], 0,
    palette[3], palette[4], palette[5], 0xff,
    palette[6], palette[7], palette[8], 0xff,
    palette[3], palette[4], palette[5], 0xff,
  ]

  expect(colorDepth.convert8to32({palette, raw8bitData})).toEqual(raw32bitData)
}