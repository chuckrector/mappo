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

{
  // can convert 24-bit image data to 32-bit
  const r = [0xff, 0, 0]
  const g = [0, 0xff, 0]
  const b = [0, 0, 0xff]
  const magenta = [0xff, 0, 0xff]

  const raw24bitData = [
    ...r, ...g,
    ...b, ...magenta,
  ]
  const raw32bitData = [
    ...r, 0xff, ...g, 0xff,
    ...b, 0xff, ...magenta, 0x00,
  ]

  expect(colorDepth.convert24to32({raw24bitData})).toEqual(raw32bitData)
}