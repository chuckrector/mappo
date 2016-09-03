"use strict"

const fs = require('fs')

module.exports = (args) => {
  const buffer = Buffer.from(args.data)
  const END_OF_DATA = null
  let position = 0

  const atEnd = () => position >= buffer.length
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

  const peekByte = () => {
    if (atEnd()) {
      return END_OF_DATA
    }

    const c = String.fromCharCode(buffer[position])
    return c
  }

  const isWhitespace = (c) => /\s/.test(c)
  const readWhitespace = () => {
    let b
    let s = ''

    while (!atEnd() && isWhitespace(peekByte())) {
      s += String.fromCharCode(readByte())
    }

    return s
  }

  const readStringVar = () => {
    let s = ''

    while (!atEnd() && !isWhitespace(peekByte())) {
      s += String.fromCharCode(readByte())
    }

    return s
  }

  const readStringAsByte = () => parseInt(readStringVar(), 10) & 0xff
  const readStringAsWord = () => parseInt(readStringVar(), 10) & 0xffff
  const readStringAsQuad = () => {
    let result = parseInt(readStringVar(), 10)

    while (result < 0) {
      result += 4294967296
    }

    if (result > 0xffffffff) {
      result %= 4294967296
    }

    return result
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

  const readLine = () => {
    let s = ''

    while (!atEnd() && peekByte() !== '\n' && peekByte() !== '\r') {
      s += String.fromCharCode(readByte())
    }

    return s
  }

  return {
    atEnd,
    readByte,
    readByteArray,
    readWord,
    readWordArray,
    readQuad,
    readQuadArray,
    readWhitespace,
    readString,
    readStringVar,
    readStringAsByte,
    readStringAsWord,
    readStringAsQuad,
    readLine,
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