"use strict"

const T = {
  u8: ({reader}) => reader.readByte(),
  u16: ({reader}) => reader.readWord(),
  u32: ({reader}) => reader.readQuad(),
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

    if (typeof length === 'function') {
      length = length(record)
    }

    while (length-- > 0) {
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
