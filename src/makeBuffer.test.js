"use strict"

const expect = require(`expect`)
const createBufferReader = require(`./createBufferReader`)
const {readFormat, T} = require(`./readFormat`)
const {makeBuffer, B} = require(`./makeBuffer`)
const filler = require(`./filler`)
const zlib = require(`zlib`)
const range = require(`lodash/range`)

{
  // can make buffers of unsigned types

  const buffer = makeBuffer([
    B.u8(0xff),
    B.u16(0xffff),
    B.u32(0xffffffff),
  ])

  const data = readFormat({
    format: {
      a: T.u8,
      b: T.u16,
      c: T.u32,
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data).toEqual({a: 0xff, b: 0xffff, c: 0xffffffff})
}

{
  // can make buffers of floating point types

  const buffer = makeBuffer([
    B.f64(1),
    B.f64([1.5, -1]),
    B.f64([-1.5, 0.003, 0]),
  ])

  const data = readFormat({
    format: {
      a: T.f64,
      b: T.list(T.f64, 2),
      c: T.list(T.f64, () => 3),
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data).toEqual({a: 1, b: [1.5, -1], c: [-1.5, 0.003, 0]})
}

{
  // can make buffers of string types

  const buffer = makeBuffer([
    B.string(` \n\t\r`),
    B.stringFixed(20, `Cute`),
    B.stringLengthEncoded(`Blessed Bacon`),
    B.stringNullTerminated(`Cuddly`),
    B.string(`Kittens 255 65535 4294967295`),
  ])

  const data = readFormat({
    format: {
      _: T.whitespace,
      adjective: T.stringFixed(20),
      food: T.stringLengthEncoded,
      type: T.stringNullTerminated,
      animal: T.string,
      a: T.stringU8,
      b: T.stringU16,
      c: T.stringU32,
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data).toEqual({
    _: ` \n\t\r`,
    adjective: `Cute`,
    food: `Blessed Bacon`,
    type: `Cuddly`,
    animal: `Kittens`,
    a: 255,
    b: 65535,
    c: 4294967295,
  })
}

{
  // can make compressed buffers

  const expandedA = filler(16 * 16, 2)
  expandedA[0] = 1
  expandedA[255] = 3
  const expandedB = expandedA.map(v => v * 1111)

  const buffer = makeBuffer([
    B.compressedU8(expandedA),
    B.compressedU16(expandedB),
  ])

  const data = readFormat({
    format: {
      a: T.compressedU8(16 * 16),
      b: T.compressedU16(16 * 16),
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data.a.decompressed).toEqual(expandedA)
  expect(data.b.decompressed).toEqual(expandedB)
}

{
  // can make zlib buffers

  const rawU8 = filler(16 * 16, 99)
  const rawU16 = filler(16 * 16, 0xbeef)
  const compressedU8 = Array.from([...zlib.deflateSync(B.u8(rawU8))])
  const compressedU16 = Array.from([...zlib.deflateSync(B.u16(rawU16))])

  const buffer = makeBuffer([
    B.zlibU8(rawU8),
    B.zlibU16(rawU16),
  ])

  const data = readFormat({
    format: {
      tiledatabuf: T.zlibU8(16 * 16),
      zonelayer: T.zlibU16(16 * 16),
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data.tiledatabuf.compressed.length).toBe(compressedU8.length)
  expect(data.tiledatabuf.compressed).toEqual(compressedU8)
  expect(data.tiledatabuf.decompressed.length).toBe(rawU8.length)
  expect(data.tiledatabuf.decompressed).toEqual(rawU8)

  expect(data.zonelayer.compressed.length).toBe(compressedU16.length)
  expect(data.zonelayer.compressed).toEqual(compressedU16)
  expect(data.zonelayer.decompressed.length).toBe(rawU8.length)
  expect(data.zonelayer.decompressed).toEqual(rawU16)
}

{
  // can make buffer of lists of types

  const buffer = makeBuffer([
    B.u8([0xff, 0xff]),
    B.u16([0xffff, 0xffff]),
    B.u32([0xffffffff, 0xffffffff]),
    // Note: createBufferReader.readString always reads whitespace after.
    // Without the whitespace after "Kittens", readString will read
    // "KittensBacon" due to the null-terminated strings which
    // immediately follow. 🐱🔥
    B.string([`Cuddly `, `Kittens `]),
    B.stringNullTerminated([`Bacon`, `Bits`]),
    B.stringFixed(20, [`Cool`, `Cucumbers`]),
  ])

  const data = readFormat({
    format: {
      a: T.list(T.u8, 2),
      b: T.list(T.u16, 2),
      c: T.list(T.u32, 2),
      d: T.list(T.string, 2),
      e: T.list(T.stringNullTerminated, 2),
      f: T.list(T.stringFixed(20), 2),
    },
    reader: createBufferReader({data: buffer})
  })

  expect(data).toEqual({
    a: [0xff, 0xff],
    b: [0xffff, 0xffff],
    c: [0xffffffff, 0xffffffff],
    d: [`Cuddly`, `Kittens`],
    e: [`Bacon`, `Bits`],
    f: [`Cool`, `Cucumbers`],
  })
}

{
  // B.list requires a valueList

  expect(() => B.list(B.u8)).toThrow(`B.list valueList must be defined`)
}
