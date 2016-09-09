"use strict"

const expect = require('expect')
const createVerge3ChrLoader = require('./createVerge3ChrLoader')
const fill = require('lodash/fill')
const zlib = require('zlib')
const {makeBuffer, B} = require('../makeBuffer')

const signature = 5392451
const version = 5
const flags = 1
const tcol = 2
const hx = 3
const hy = 4
const hw = 5
const hh = 6
const fxsize = 7
const fysize = 8
const totalframes = 9
const didle = 10
const uidle = 11
const lidle = 12
const ridle = 13
const customscripts = 14
const compression = 15
const imagedata = fill(Array(fxsize * fysize * 4 * totalframes), 99)
const imagedataCompressed = [...zlib.deflateSync(Buffer.from(imagedata))]

const chrs = makeBuffer([
  B.u32([
    signature,
    version,
    32, // bpp
    flags,
    tcol,
    hx, hy, hw, hh,
    fxsize, fysize,
    totalframes,
    didle, uidle, lidle, ridle,
  ]),
  B.u32(2), B.string('F0\0'),
  B.u32(2), B.string('F1\0'),
  B.u32(2), B.string('F2\0'),
  B.u32(2), B.string('F3\0'),
  B.u32(2), B.string('F4\0'),
  B.u32(2), B.string('F5\0'),
  B.u32(2), B.string('F6\0'),
  B.u32(2), B.string('F7\0'),
  B.u32([customscripts, compression]),
  B.u32([imagedata.length, imagedataCompressed.length]),
  B.u8(imagedataCompressed),
])

{
  // can read chrs
  const loader = createVerge3ChrLoader({
    data: chrs
  })

  const data = loader.load()

  expect(data.signature).toBe(signature)
  expect(data.version).toBe(version)
  expect(data.bpp).toBe(32)
  expect(data.flags).toBe(flags)
  expect(data.tcol).toBe(tcol)
  expect(data.hx).toBe(hx)
  expect(data.hy).toBe(hy)
  expect(data.hw).toBe(hw)
  expect(data.hh).toBe(hh)
  expect(data.fxsize).toBe(fxsize)
  expect(data.fysize).toBe(fysize)
  expect(data.totalframes).toBe(totalframes)
  expect(data.didle).toBe(10)
  expect(data.uidle).toBe(11)
  expect(data.lidle).toBe(12)
  expect(data.ridle).toBe(13)
  expect(data.anims).toEqual([
    {length: 2, animbuf: 'F0'},
    {length: 2, animbuf: 'F1'},
    {length: 2, animbuf: 'F2'},
    {length: 2, animbuf: 'F3'},
    {length: 2, animbuf: 'F4'},
    {length: 2, animbuf: 'F5'},
    {length: 2, animbuf: 'F6'},
    {length: 2, animbuf: 'F7'},
  ])
  expect(data.imagedata.decompressed).toEqual(imagedata)
}