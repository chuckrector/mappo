"use strict"

const T = {
  u8: (reader) => reader.readByte(),
  u16: (reader) => reader.readWord(),
  u32: (reader) => reader.readQuad(),
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