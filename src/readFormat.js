"use strict"

const lengthCalculator = (length, {reader, record}) => {
  if (typeof length === 'function') {
    return length({reader, record})
  }

  return length
}

const T = {
  u8: ({reader}) => reader.readByte(),
  u16: ({reader}) => reader.readWord(),
  u32: ({reader}) => reader.readQuad(),

  string: ({reader}) => reader.readString(),
  stringU8: ({reader}) => reader.readStringAsByte(),
  stringU16: ({reader}) => reader.readStringAsWord(),
  stringU32: ({reader}) => reader.readStringAsQuad(),
  stringFixed: (length) => {
    return ({reader, record}) => {
      return reader.readStringFixed(lengthCalculator(length, {reader, record}))
    }
  },

  compressedU8: (length) => {
    return ({reader, record}) => {
      return reader.readByteArrayCompressed(lengthCalculator(length, {reader, record}))
    }
  },
  compressedU16: (length) => {
    return ({reader, record}) => {
      return reader.readWordArrayCompressed(lengthCalculator(length, {reader, record}))
    }
  }
}

const resolve = (formatOrFunction, {reader, record}) => {
  if (typeof formatOrFunction === 'function') {
    return formatOrFunction({reader, record})
  } else {
    return readFormat({format: formatOrFunction, reader})
  }
}

T.list = (formatOrFunction, length) => {
  return ({reader, record}) => {
    const recordList = []

    let L = lengthCalculator(length, {reader, record})
    while (L-- > 0) {
      recordList.push(resolve(formatOrFunction, {reader, record}))
    }

    return recordList
  }
}

const readFormat = ({format, reader}) => {
  const record = {}

  Object.keys(format).forEach((key) => {
    record[key] = resolve(format[key], {reader, record})
  })

  return record
}

module.exports = {
  readFormat,
  T
}
