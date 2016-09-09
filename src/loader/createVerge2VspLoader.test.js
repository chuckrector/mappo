"use strict"

const expect = require('expect')
const createVerge2VspLoader = require('./createVerge2VspLoader')
const fill = require('lodash/fill')
const {makeBuffer, B} = require('../makeBuffer')

const vspVersion = 3
const vspPalette = fill(Array(256 * 3), 77)
const vspNumTiles = 3
const vspImageData = [
  ...fill(Array(128), 44), ...fill(Array(128), 55),
  ...fill(Array(128), 66), ...fill(Array(128), 77),
  ...fill(Array(128), 88), ...fill(Array(128), 99),
]

const vspAnimationList = fill(Array(100), {
  start: 4,
  finish: 3,
  delay: 2,
  mode: 1,
})

{
  // can read vsp
  const loader = createVerge2VspLoader({
    data: makeBuffer([
      B.u16(vspVersion),
      B.u8(vspPalette),
      B.u16(vspNumTiles),
      // compressed image data
      B.u32(6 * 3),
      B.u8([
        0xff, 128, 44, 0xff, 128, 55,
        0xff, 128, 66, 0xff, 128, 77,
        0xff, 128, 88, 0xff, 128, 99
      ]),
      ...vspAnimationList.map((vspAnimation) => {
        return B.u16([
          vspAnimation.start,
          vspAnimation.finish,
          vspAnimation.delay,
          vspAnimation.mode,
        ])
      }),
    ])
  })

  const data = loader.load()

  expect(data.version).toBe(vspVersion)
  expect(data.palette).toEqual(vspPalette)
  expect(data.numtiles).toBe(vspNumTiles)
  expect(data.imagedata.decompressed).toEqual(vspImageData)
  expect(data.vspanim).toEqual(vspAnimationList)
}