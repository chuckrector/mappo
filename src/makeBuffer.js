"use strict"

const zlib = require('zlib')
const padEnd = require('lodash/padEnd')
const compressU8 = require('./compressU8')
const compressU16 = require('./compressU16')

const B = {}

B.u8 = (value) => Buffer.from([value])
B.u16 = (value) => Buffer.from(new Uint16Array([value]).buffer)
B.u32 = (value) => Buffer.from(new Uint32Array([value]).buffer)
B.f64 = (value) => Buffer.from(new Float64Array([value]).buffer)
B.string = (value) => Buffer.from(value)
B.stringNullTerminated = (value) => B.string(value + '\0')
B.stringFixed = (length, value) => B.string(padEnd(value, length, '\0'))

B.compressedU8 = (valueList) => {
  const compressed = compressU8(valueList)
  return Buffer.concat([
    B.u32(compressed.length),
    Buffer.from(compressed),
  ])
}

B.compressedU16 = (valueList) => {
  const compressed = compressU16(valueList)
  return Buffer.concat([
    B.u32(compressed.length * 2),
    Buffer.from(new Uint16Array(compressed).buffer),
  ])
}

B.zlib = (valueList) => {
  const compressed = zlib.deflateSync(Buffer.from(valueList))
  return Buffer.concat([
    B.u32(valueList.length),
    B.u32(compressed.length),
    Buffer.from(compressed),
  ])
}

B.list = (bufferMaker, valueList) => {
  if (typeof valueList === 'undefined') {
    throw new Error('B.list valueList must be defined')
  }

  return Buffer.concat(valueList.map((currentValue) => (
    bufferMaker(currentValue)
  )))
}

module.exports = {
  makeBuffer: (bufferList) => Buffer.concat(bufferList),
  B
}
