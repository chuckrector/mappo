"use strict"

const zlib = require('zlib')

const lengthCalculator = (length, {reader, record, listIndex}) => {
  if (typeof length === 'function') {
    return length({reader, record, listIndex})
  }

  return length
}

const T = {
  u8: ({reader}) => reader.readByte(),
  u16: ({reader}) => reader.readWord(),
  u32: ({reader}) => reader.readQuad(),

  whitespace: ({reader}) => reader.readWhitespace(),
  string: ({reader}) => reader.readString(),
  stringU8: ({reader}) => reader.readStringAsByte(),
  stringU16: ({reader}) => reader.readStringAsWord(),
  stringU32: ({reader}) => reader.readStringAsQuad(),
  stringFixed: (length) => {
    return ({reader, record, listIndex}) => {
      return reader.readStringFixed(lengthCalculator(length, {reader, record, listIndex}))
    }
  },

  compressedU8: (length) => {
    return ({reader, record, listIndex}) => {
      return reader.readByteArrayCompressed(lengthCalculator(length, {reader, record, listIndex}))
    }
  },
  compressedU16: (length) => {
    return ({reader, record, listIndex}) => {
      return reader.readWordArrayCompressed(lengthCalculator(length, {reader, record, listIndex}))
    }
  },

  zlib: (length) => {
    return ({reader, record, listIndex}) => {
      return reader.readZlib(lengthCalculator(length, {reader, record, listIndex}))
    }
  }
}

const resolve = (formatOrFunction, {reader, record, listIndex}) => {
  if (typeof formatOrFunction === 'function') {
    return formatOrFunction({reader, record, listIndex})
  } else {
    return readFormat({format: formatOrFunction, reader, listIndex})
  }
}

T.list = (formatOrFunction, length) => {
  if (typeof length === 'undefined') {
    throw {message: 'T.list length must be defined'}
  }

  // TODO: verify this "outer" listIndex can be safely ignored
  return ({reader, record, listIndex}) => {
    const recordList = []

    let L = lengthCalculator(length, {reader, record, listIndex})
    for (let index = 0; index < L; index++) {
      recordList.push(resolve(formatOrFunction, {reader, record, listIndex: index}))
    }

    return recordList
  }
}

const readFormat = ({format, reader, listIndex=null}) => {
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
