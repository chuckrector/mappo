"use strict"

const zlib = require('zlib')

const T = {}

T.u8 = ({reader}) => reader.readByte()
T.u16 = ({reader}) => reader.readWord()
T.u32 = ({reader}) => reader.readQuad()
T.f64 = ({reader}) => reader.readDouble()
T.whitespace = ({reader}) => reader.readWhitespace()
T.string = ({reader}) => reader.readString()
T.stringU8 = ({reader}) => reader.readStringAsByte()
T.stringU16 = ({reader}) => reader.readStringAsWord()
T.stringU32 = ({reader}) => reader.readStringAsQuad()
T.stringNullTerminated = ({reader}) => reader.readStringNullTerminated()
T.stringFixed = (length) => {
  return ({reader, record, listIndex}) => {
    return reader.readStringFixed(lengthCalculator(length, {reader, record, listIndex}))
  }
}

T.compressedU8 = (length) => {
  return ({reader, record, listIndex}) => {
    return reader.readByteArrayCompressed(lengthCalculator(length, {reader, record, listIndex}))
  }
}

T.compressedU16 = (length) => {
  return ({reader, record, listIndex}) => {
    return reader.readWordArrayCompressed(lengthCalculator(length, {reader, record, listIndex}))
  }
}

T.zlib = (length) => {
  return ({reader, record, listIndex}) => {
    return reader.readZlib(lengthCalculator(length, {reader, record, listIndex}))
  }
}

T.palette6bit = ({reader}) => {
  const _6bit = reader.readByteArray(256 * 3)
  const _8bit = _6bit.map(v => v * 4)

  return {
    _6bit,
    _8bit,
  }
}

T.list = (formatOrFunction, length) => {
  if (typeof length === 'undefined') {
    throw new Error('T.list length must be defined')
  }

  return ({reader, record, listIndex}) => {
    const recordList = []

    let L = lengthCalculator(length, {reader, record, listIndex})
    for (let index = 0; index < L; index++) {
      recordList.push(resolve(formatOrFunction, {reader, record, listIndex: index}))
    }

    return recordList
  }
}

const lengthCalculator = (length, {reader, record, listIndex}) => {
  if (typeof length === 'function') {
    return length({reader, record, listIndex})
  }

  return length
}

const resolve = (formatOrFunction, {reader, record, listIndex}) => {
  if (typeof formatOrFunction === 'function') {
    return formatOrFunction({reader, record, listIndex})
  } else {
    return readFormat({format: formatOrFunction, reader, listIndex})
  }
}

const readFormat = ({format, reader, listIndex}) => {
  const record = {}

  Object.keys(format).forEach((key) => {
    record[key] = resolve(format[key], {reader, record, listIndex})
  })

  return record
}

module.exports = {
  readFormat,
  T
}
