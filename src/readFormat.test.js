"use strict"

const expect = require('expect')
const createDataReader = require('./createDataReader')
const {readFormat, T} = require('./readFormat')

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
      grid: T.list(T.u8, (record) => record.w * record.h),
    },
    reader: createDataReader({data: buffer})
  })

  expect(data).toEqual({
    w: 2,
    h: 3,
    grid: [44, 55, 66, 77, 88, 99],
  })
}