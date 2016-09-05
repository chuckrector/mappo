"use strict"

const T = {
  u8: (reader) => reader.readByte(),
  u16: (reader) => reader.readWord(),
  u32: (reader) => reader.readQuad(),
}

T.list = (format, length) => {
  return (reader) => {
    const recordList = []

    while (length-- > 0) {
      recordList.push(format(reader))
    }

    return recordList
  }
}

const readFormat = ({format, reader}) => {
  const record = {}

  Object.keys(format).forEach((key) => {
    record[key] = format[key](reader)
  })

  return record
}

module.exports = {
  readFormat,
  T
}