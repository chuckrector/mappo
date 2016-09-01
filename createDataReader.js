"use strict"

const fs = require('fs')

module.exports = (args) => {
  const buffer = Buffer.from(args.data)
  let position = 0

  const readByte = () => buffer.readUInt8(position++)

  const readByteArray = (length) => {
    let result = []

    while (length-- > 0) {
      result.push(readByte())
    }

    return result
  }

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

  const readWordArray = (length) => {
    let result = []

    while (length-- > 0) {
      result.push(readWord())
    }

    return result
  }

  const readQuad = () => {
    const value = buffer.readUInt32LE(position)
    position += 4
    return value
  }

  const readQuadArray = (length) => {
    let result = []

    while (length-- > 0) {
      result.push(readQuad())
    }

    return result
  }

  return {
    readByte,
    readByteArray,
    readWord,
    readWordArray,
    readQuad,
    readQuadArray,
    readString,
    get position() {
      return position
    },
    set position(value) {
      position = value
    },
    get length() {
      return buffer.length
    },
  }
}