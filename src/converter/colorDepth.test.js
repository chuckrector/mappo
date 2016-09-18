"use strict"

const expect = require('expect')
const colorDepth = require('./colorDepth')

{
  // can convert 8-bit image data to 32-bit
  const palette = [0xff, 0, 0, 0, 0xff, 0, 0, 0, 0xff]
  const raw8bitData = [1, 2, 1, 0]
  const raw32bitData = [
    palette[3], palette[4], palette[5], 0xff,
    palette[6], palette[7], palette[8], 0xff,
    palette[3], palette[4], palette[5], 0xff,
    palette[0], palette[1], palette[2], 0,
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

{
  // 24- to 32-bit conversion must be multiples of 3
  expect(() => colorDepth.convert24to32({raw24bitData: [1]})).toThrow('expected raw 24-bit data length to be divisible by three but got 1')
}

{
  // can convert 16-bit image data to 32-bit
  const r16 = 0xf800
  const g16 = 0x07e0
  const b16 = 0x001f
  const black16 = 0x0000

  const r24 = [248, 0, 0]
  const g24 = [0, 252, 0]
  const b24 = [0, 0, 248]
  const black24 = [0, 0, 0]

  const raw16bitData = [r16, g16, b16, black16]
  const raw32bitData = [
    ...r24, 0xff, ...g24, 0xff,
    ...b24, 0xff, ...black24, 0x00,
  ]

  expect(colorDepth.convert16to32({raw16bitData})).toEqual(raw32bitData)
}