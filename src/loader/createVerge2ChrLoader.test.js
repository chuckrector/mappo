"use strict"

const expect = require('expect')
const createVerge2ChrLoader = require('./createVerge2ChrLoader')
const fill = require('lodash/fill')
const {makeBuffer, B} = require('../makeBuffer')

const version = 2
const fxsize = 2
const fysize = 3
const hx = 3
const hy = 4
const hw = fxsize - 1
const hh = fysize - 1
const totalframes = 2
const frameData = fill(Array(fxsize * fysize * 2), 99)

const chrs = makeBuffer([
  B.u8(version),
  B.u16([fxsize, fysize, hx, hy, hw, hh, totalframes]),
  // compressed image data
  B.u32(3),
  B.u8([0xff, fxsize * fysize * totalframes, 99]),
  // lidle, ridle, uidle, didle
  B.u32([4, 3, 2, 1]),
  // animations
  B.u32(2), B.string('F1'),
  B.u32(2), B.string('F2'),
  B.u32(2), B.string('F3'),
  B.u32(2), B.string('F4'),
])

{
  // can read chrs
  const loader = createVerge2ChrLoader({
    data: chrs
  })

  const data = loader.load()

  expect(data.version).toBe(2)
  expect(data.fxsize).toBe(fxsize)
  expect(data.fysize).toBe(fysize)
  expect(data.hx).toBe(hx)
  expect(data.hy).toBe(hy)
  expect(data.hw).toBe(hw)
  expect(data.hh).toBe(hh)
  expect(data.totalframes).toBe(totalframes)
  expect(data.imagedata.decompressed).toEqual(frameData)
  expect(data.lidle).toBe(4)
  expect(data.ridle).toBe(3)
  expect(data.uidle).toBe(2)
  expect(data.didle).toBe(1)
  expect(data.lanim).toBe('F1')
  expect(data.ranim).toBe('F2')
  expect(data.uanim).toBe('F3')
  expect(data.danim).toBe('F4')
}