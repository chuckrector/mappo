"use strict"

const expect = require('expect')
const createVerge2ChrLoader = require('./createVerge2ChrLoader')
const fill = require('lodash/fill')

const version = 2
const fxsize = 2
const fysize = 3
const hx = 3
const hy = 4
const hw = fxsize - 1
const hh = fysize - 1
const totalframes = 2
const frameData = fill(Array(fxsize * fysize * 2), 99)

const chrs = Buffer.concat([
  Buffer.from([version]),
  Buffer.from(new Uint16Array([fxsize, fysize, hx, hy, hw, hh, totalframes]).buffer),
  // compressed image data
  Buffer.from(new Uint32Array([3]).buffer),
  Buffer.from([0xff, fxsize * fysize * totalframes, 99]),
  // lidle, ridle, uidle, didle
  Buffer.from(new Uint32Array([4, 3, 2, 1]).buffer),
  // animations
  Buffer.from(new Uint32Array([2]).buffer),
  Buffer.from('F1'),
  Buffer.from(new Uint32Array([2]).buffer),
  Buffer.from('F2'),
  Buffer.from(new Uint32Array([2]).buffer),
  Buffer.from('F3'),
  Buffer.from(new Uint32Array([2]).buffer),
  Buffer.from('F4'),
])

{
  // can read chrs
  const loader = createVerge2ChrLoader({
    data: Buffer.from(chrs)
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