"use strict"

const zlib = require('zlib')
const padEnd = require('lodash/padEnd')
const compressU8 = require('./compressU8')
const compressU16 = require('./compressU16')

const B = {}

const arrMatey = (value) => Array.isArray(value) ? value : [value]
const arrToBuffer = (value, arrayType) => {
  const arr = new arrayType(arrMatey(value))
  return Buffer.from(arr.buffer)
}

B.u8 = (value) => arrToBuffer(value, Uint8Array)
B.u16 = (value) => arrToBuffer(value, Uint16Array)
B.u32 = (value) => arrToBuffer(value, Uint32Array)
B.f64 = (value) => arrToBuffer(value, Float64Array)

B.string = (value) => Buffer.from(arrMatey(value).join(''))
B.stringNullTerminated = (value) => {
  return B.string(arrMatey(value).map(v => v + '\0'))
}
B.stringFixed = (length, value) => {
  return B.string(arrMatey(value).map(v => padEnd(v, length, '\0')))
}

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
