"use strict"

const fs = require('fs')
const assert = require('assert')

module.exports = (args) => {
  const buffer = Buffer.from(args.data)
  const END_OF_DATA = null
  let position = 0

  const atEnd = () => position >= buffer.length
  const atMatch = (match) => {
    return buffer.toString('utf-8', position, position + match.length) === match
  }

  const readByte = () => buffer.readUInt8(position++)

  const readByteArray = (length) => {
    let result = []

    while (length-- > 0) {
      result.push(readByte())
    }

    return result
  }

  const readByteArrayCompressed = (length) => {
    const bufsize = readQuad()
    const decompressed = []

    do {
      let w = readByte()
      if (w === 0xff) {
        const run = readByte()
        w = readByte()
        for (let j = 0; j < run; j++) {
          decompressed.push(w)
        }
      } else {
        decompressed.push(w)
      }
    } while (decompressed.length < length)

    return {
      bufsize,
      decompressed,
    }
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

  const readWordArrayCompressed = (length) => {
    const bufsize = readQuad()

    assert.equal(bufsize % 2, 0, 'expected compressed word array size to be divisible by two but got ' + bufsize)

    const decompressed = []

    do {
      let w = readWord()
      if ((w & 0xff00) === 0xff00) {
        const run = w & 0xff
        w = readWord()
        for (let j = 0; j < run; j++) {
          decompressed.push(w)
        }
      } else {
        decompressed.push(w)
      }
    } while (decompressed.length < length)

    return {
      bufsize,
      decompressed,
    }
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
    atMatch,
    readByte,
    readByteArray,
    readByteArrayCompressed,
    readWord,
    readWordArray,
    readWordArrayCompressed,
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