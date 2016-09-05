"use strict"

const expect = require('expect')
const createDataReader = require('./createDataReader')
const {readFormat, T} = require('./readFormat')
const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const zlib = require('zlib')

{
  // can read unsigned types

  const buffer = Buffer.concat([
    Buffer.from([0xff]),
    Buffer.from(new Uint16Array([0xffff]).buffer),
    Buffer.from(new Uint32Array([0xffffffff]).buffer),
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
  // can read string types

  const buffer = Buffer.concat([
    Buffer.from(' \n\t\r'),
    Buffer.from(padEnd('Cute', 20, '\0')),
    Buffer.from('Cuddly Kittens 255 65535 4294967295')
  ])

  const data = readFormat({
    format: {
      _: T.whitespace,
      adjective: T.stringFixed(20),
      type: T.string,
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
  // can read fixed length strings of... dynamic length 🤔
  //
  // the verge2 chr loader reads a length for idle animation
  // strings and then reads a fixed length string of that length.
  // for a string field of length L at position P, if the null
  // terminator always lies at P+L-1, that would allow the use
  // of a function such as readStringNullTerminated. of course,
  // in that case, the leading L on disk would be ignored. but
  // it may solve the human readability issue.
  //
  // alternatively, perhaps rename readStringFixed to
  // readStringNullTerminated and pass an optional length
  // parameter. without a given length, it would read until
  // finding a null terminator. with a length, it would behave
  // as readStringFixed currently does.

  const buffer = Buffer.concat([
    Buffer.from([5]),
    Buffer.from('Cute\0Cuddly Kittens'),
  ])

  const data = readFormat({
    format: {
      adjectiveLength: T.u8,
      adjective: T.stringFixed(({record}) => record.adjectiveLength),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    adjectiveLength: 5,
    adjective: 'Cute',
  })
}

{
  // can read lists of lists

  const buffer = Buffer.concat([
    Buffer.from([1, 2, 3]),
    Buffer.from([4, 5, 6]),
  ])

  const data = readFormat({
    format: {
      a: T.list({
        b: T.list(T.u8, 3),
      }, 2)
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    a: [
      {b: [1, 2, 3]},
      {b: [4, 5, 6]},
    ]
  })
}

{
  // can read compressed buffers

  const buffer = Buffer.concat([
    Buffer.from(new Uint32Array([5]).buffer),
    Buffer.from([1, 0xff, (16 * 16) - 2, 2, 3]),
    Buffer.from(new Uint32Array([4 * 2]).buffer),
    Buffer.from(new Uint16Array([1111, ((16 * 16) - 2) | 0xff00, 2222, 3333]).buffer),
  ])

  const data = readFormat({
    format: {
      a: T.compressedU8(16 * 16),
      b: T.compressedU16(16 * 16),
    },
    reader: createDataReader({data: buffer})
  })

  const expandedA = fill(Array(16 * 16), 2)
  expandedA[0] = 1
  expandedA[255] = 3

  expect(data.a.decompressed).toEqual(expandedA)
  expect(data.b.decompressed).toEqual(expandedA.map(v => v * 1111))
}

{
  // can read zlib compressed buffers

  const raw = fill(Array(16 * 16), 99)
  const compressedBuffer = [...zlib.deflateRawSync(Buffer.from(raw))]
  const buffer = Buffer.concat([
    Buffer.from(new Uint32Array([raw.length, compressedBuffer.length]).buffer),
    Buffer.from(compressedBuffer)
  ])

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
  // can read dynamic length compressed buffers

  const buffer = Buffer.concat([
    Buffer.from(new Uint16Array([16 * 16, 16 * 16]).buffer),
    Buffer.from(new Uint32Array([5]).buffer),
    Buffer.from([1, 0xff, (16 * 16) - 2, 2, 3]),
    Buffer.from(new Uint32Array([4 * 2]).buffer),
    Buffer.from(new Uint16Array([1111, ((16 * 16) - 2) | 0xff00, 2222, 3333]).buffer),
  ])

  const data = readFormat({
    format: {
      lengthA: T.u16,
      lengthB: T.u16,
      a: T.compressedU8(({record}) => record.lengthA),
      b: T.compressedU16(({record}) => record.lengthB),
    },
    reader: createDataReader({data: buffer})
  })

  const expandedA = fill(Array(16 * 16), 2)
  expandedA[0] = 1
  expandedA[255] = 3

  expect(data.a.decompressed).toEqual(expandedA)
  expect(data.b.decompressed).toEqual(expandedA.map(v => v * 1111))
}

{
  // can read list of types

  const buffer = Buffer.concat([
    Buffer.from([0xff, 0xff]),
    Buffer.from(new Uint16Array([0xffff, 0xffff]).buffer),
    Buffer.from(new Uint32Array([0xffffffff, 0xffffffff]).buffer),
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
  // T.list requires a length

  expect(() => T.list(T.u8)).toThrow(Error, 'T.list length must be defined')
}

{
  // can read nested formats

  const buffer = Buffer.concat([
    Buffer.from([0xff]),
    Buffer.from(new Uint16Array([0xffff]).buffer),
    Buffer.from(new Uint32Array([0xffffffff]).buffer),
  ])

  const data = readFormat({
    format: {
      a: T.u8,
      b: {
        c: T.u16,
        d: T.u32,
      },
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    a: 0xff,
    b: {
      c: 0xffff,
      d: 0xffffffff,
    }
  })
}

{
  // can read list of formats

  const buffer = Buffer.concat([
    Buffer.from([0xff]),
    Buffer.from(new Uint16Array([0xffff]).buffer),
    Buffer.from(new Uint32Array([0xffffffff]).buffer),
    Buffer.from(new Uint16Array([0xffff]).buffer),
    Buffer.from(new Uint32Array([0xffffffff]).buffer),
  ])

  const data = readFormat({
    format: {
      a: T.list({
        b: T.u16,
        c: T.u32,
      }, 2)
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    a: [
      {b: 0xffff, c: 0xffffffff},
      {b: 0xffff, c: 0xffffffff},
    ]
  })
}

{
  // can read list of dynamic length

  const buffer = Buffer.concat([
    Buffer.from([2, 3, 44, 55, 66, 77, 88, 99]),
  ])

  const data = readFormat({
    format: {
      w: T.u8,
      h: T.u8,
      grid: T.list(T.u8, ({record}) => record.w * record.h),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    w: 2,
    h: 3,
    grid: [44, 55, 66, 77, 88, 99],
  })
}

{
  // can read current T.list index in dynamic length calculators

  const firstLayerWidth = 3
  const firstLayerHeight = 4
  const firstLayerFill = 77
  const secondLayerWidth = 5
  const secondLayerHeight = 6
  const secondLayerFill = 88
  const buffer = Buffer.concat([
    Buffer.from([
      2,
      firstLayerWidth, firstLayerHeight,
      secondLayerWidth, secondLayerHeight,
    ]),
    Buffer.concat([
      Buffer.from(new Uint32Array([2 * 2]).buffer),
      Buffer.from(new Uint16Array([
        (firstLayerWidth * firstLayerHeight) | 0xff00,
        firstLayerFill,
      ]).buffer),
      Buffer.from(new Uint32Array([2 * 2]).buffer),
      Buffer.from(new Uint16Array([
        (secondLayerWidth * secondLayerHeight) | 0xff00,
        secondLayerFill
      ]).buffer),
    ])
  ])

  const data = readFormat({
    format: {
      numlayers: T.u8,
      layer: T.list({
        sizex: T.u8,
        sizey: T.u8,
      }, ({record}) => record.numlayers),
      layers: T.list(
        T.compressedU16(({record, listIndex}) => {
          const sizex = record.layer[listIndex].sizex
          const sizey = record.layer[listIndex].sizey
          const size = sizex * sizey
          return size
        }),
        ({record}) => record.numlayers
      )
    },
    reader: createDataReader({data: buffer})
  })

  expect(data.numlayers).toBe(2)
  expect(data.layer.length).toBe(2)
  expect(data.layers.length).toBe(2)
  expect(data.layers[0].decompressed).toEqual(
    fill(Array(firstLayerWidth * firstLayerHeight), firstLayerFill)
  )
  expect(data.layers[1].decompressed).toEqual(
    fill(Array(secondLayerWidth * secondLayerHeight), secondLayerFill)
  )
}

{
  // can read list of all remaining bytes

  const buffer = Buffer.concat([
    Buffer.from([44, 55, 66, 77, 88, 99]),
  ])

  const data = readFormat({
    format: {
      grid: T.list(T.u8, ({reader}) => reader.remaining),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    grid: [44, 55, 66, 77, 88, 99],
  })
}