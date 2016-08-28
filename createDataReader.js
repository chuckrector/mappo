"use strict"

const fs = require('fs')

module.exports = (args) => {
  const buffer = Buffer.from(args.data)
  let position = 0

  const readByte = () => buffer.readUInt8(position++)

  const readString = (length) => {
    let s = buffer.toString('utf-8', position, position + length)

    // js will happily show everything beyond this point, so truncate it
    const zero = s.indexOf('\0')
    if (zero !== -1) {
      s = s.substring(0, zero)
    }

    position += length

    return s
  }

  const readWord = () => {
    const value = buffer.readUInt16LE(position)
    position += 2
    return value
  }

  return {
    readByte,
    readWord,
    readString,
  }
}