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