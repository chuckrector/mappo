"use strict"

const expect = require('expect')
const createDataReader = require('./createDataReader')
const {readFormat, T} = require('./readFormat')
const {makeBuffer, B} = require('./makeBuffer')
const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const zlib = require('zlib')
const range = require('lodash/range')

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
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({a: 0xff, b: 0xffff, c: 0xffffffff})
}

{
  // can make buffers of floating point types

  const buffer = makeBuffer([
    B.f64(1),
    B.list(B.f64, [1.5, -1]),
    B.list(B.f64, [-1.5, 0.003, 0]),
  ])

  const data = readFormat({
    format: {
      a: T.f64,
      b: T.list(T.f64, 2),
      c: T.list(T.f64, () => 3),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({a: 1, b: [1.5, -1], c: [-1.5, 0.003, 0]})
}

{
  // can make buffers of string types

  const buffer = makeBuffer([
    B.string(' \n\t\r'),
    B.stringFixed(20, 'Cute'),
    B.stringNullTerminated('Cuddly'),
    B.string('Kittens 255 65535 4294967295'),
  ])

  const data = readFormat({
    format: {
      _: T.whitespace,
      adjective: T.stringFixed(20),
      type: T.stringNullTerminated,
      animal: T.string,
      a: T.stringU8,
      b: T.stringU16,
      c: T.stringU32,
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    _: ' \n\t\r',
    adjective: 'Cute',
    type: 'Cuddly',
    animal: 'Kittens',
    a: 255,
    b: 65535,
    c: 4294967295,
  })
}

{
  // can make compressed buffers

  const expandedA = fill(Array(16 * 16), 2)
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
    reader: createDataReader({data: buffer})
  })

  expect(data.a.decompressed).toEqual(expandedA)
  expect(data.b.decompressed).toEqual(expandedB)
}

{
  // can make zlib compressed buffers

  const raw = fill(Array(16 * 16), 99)
  const compressedBuffer = [...zlib.deflateSync(Buffer.from(raw))]
  const buffer = makeBuffer([B.zlib(raw)])

  const data = readFormat({
    format: {tiledatabuf: T.zlib(16 * 16)},
    reader: createDataReader({data: buffer})
  })

  expect(data.tiledatabuf.mysize).toBe(raw.length)
  expect(data.tiledatabuf.comprLen).toBe(compressedBuffer.length)
  expect(data.tiledatabuf.decompressed.length).toBe(raw.length)
  expect(data.tiledatabuf.decompressed).toEqual(raw)
}


{
  // can make buffer of lists of types

  const buffer = makeBuffer([
    B.list(B.u8, [0xff, 0xff]),
    B.list(B.u16, [0xffff, 0xffff]),
    B.list(B.u32, [0xffffffff, 0xffffffff]),
  ])

  const data = readFormat({
    format: {
      a: T.list(T.u8, 2),
      b: T.list(T.u16, 2),
      c: T.list(T.u32, 2),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    a: [0xff, 0xff],
    b: [0xffff, 0xffff],
    c: [0xffffffff, 0xffffffff],
  })
}

{
  // B.list requires a valueList

  expect(() => B.list(B.u8)).toThrow('B.list valueList must be defined')
}
