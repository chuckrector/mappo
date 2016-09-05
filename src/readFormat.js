"use strict"

const T = {
  u8: (reader) => reader.readByte(),
  u16: (reader) => reader.readWord(),
  u32: (reader) => reader.readQuad(),
}

const resolve = (formatOrFunction, reader) => {
  if (typeof formatOrFunction === 'function') {
    return formatOrFunction(reader)
  } else {
    return readFormat({format: formatOrFunction, reader})
  }
}

T.list = (formatOrFunction, length) => {
  return (reader) => {
    const recordList = []

    while (length-- > 0) {
      recordList.push(resolve(formatOrFunction, reader))
    }

    return recordList
  }
}

const readFormat = ({format, reader}) => {
  const record = {}

  Object.keys(format).forEach((key) => {
    record[key] = resolve(format[key], reader)
  })

  return record
}

module.exports = {
  readFormat,
  T
}
