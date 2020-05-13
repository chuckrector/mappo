"use strict"

const assert = require(`assert`)
const zlib =  require(`zlib`)
const {makeBuffer, B} = require(`./makeBuffer`)

const createBufferReader = (args) => {
  const buffer = Buffer.from(args.data)
  const END_OF_DATA = null
  let position = 0

  const atEnd = () => position >= buffer.length
  const atMatch = (match) => {
    return buffer.toString(`utf-8`, position, position + match.length) === match
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
    const compressed = readByteArray(bufsize)
    const compressedReader = createBufferReader({data: compressed})
    const decompressed = []

    do {
      let w = compressedReader.readByte()
      if (w === 0xff) {
        const run = compressedReader.readByte()
        w = compressedReader.readByte()
        for (let j = 0; j < run; j++) {
          decompressed.push(w)
        }
      } else {
        decompressed.push(w)
      }
    } while (decompressed.length < length)

    return {
      bufsize,
      compressed,
      decompressed,
    }
  }

  const readStringLengthEncoded = () => {
    const length = readQuad()

    return readStringFixed(length)
  }

  const readStringFixed = (length) => {
    let s = buffer.toString(`utf-8`, position, position + length)

    // js will happily show everything beyond this point, so truncate it
    const zero = s.indexOf(`\0`)
    if (zero !== -1) {
      s = s.substring(0, zero)
    }

    position += length

    return s
  }

  const readStringNullTerminated = () => {
    let s = ``

    while (!atEnd() && peekByte() !== `\0`) {
      s += String.fromCharCode(readByte())
    }

    readByte()

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
    let s = ``

    while (!atEnd() && isWhitespace(peekByte())) {
      s += String.fromCharCode(readByte())
    }

    return s
  }

  const readString = () => {
    let s = ``

    while (!atEnd() && !isWhitespace(peekByte())) {
      s += String.fromCharCode(readByte())
    }

    readWhitespace()

    return s
  }

  const readStringAsByte = () => parseInt(readString(), 10) & 0xff
  const readStringAsWord = () => parseInt(readString(), 10) & 0xffff
  const readStringAsQuad = () => {
    let result = parseInt(readString(), 10)

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

    assert.equal(bufsize % 2, 0, `expected compressed word array size to be divisible by two but got ` + bufsize)

    const compressed = readByteArray(bufsize)
    const compressedReader = createBufferReader({data: compressed})
    const decompressed = []

    do {
      let w = compressedReader.readWord()
      if ((w & 0xff00) === 0xff00) {
        const run = w & 0xff
        w = compressedReader.readWord()
        for (let j = 0; j < run; j++) {
          decompressed.push(w)
        }
      } else {
        decompressed.push(w)
      }
    } while (decompressed.length < length)

    return {
      bufsize,
      compressed,
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

  const readDouble = () => {
    const value = buffer.readDoubleLE(position)
    position += 8
    return value
  }

  const readDoubleArray = (length) => {
    let result = []

    while (length-- > 0) {
      result.push(readDouble())
    }

    return result
  }

  const readLine = () => {
    let s = ``

    while (!atEnd() && peekByte() !== `\n` && peekByte() !== `\r`) {
      s += String.fromCharCode(readByte())
    }

    return s
  }

  const readLines = () => {
    let a = []

    while (!atEnd()) {
      let s = ``
      while (!atEnd() && peekByte() !== `\n` && peekByte() !== `\r`) {
        s += String.fromCharCode(readByte())
      }
      a.push(s)
      while (!atEnd() && (peekByte() === `\n` || peekByte() === `\r`)) {
        readByte();
      }
    }

    return a
  }

  const readZlibU8 = (length) => {
    const mysize = readQuad()
    if (mysize !== length) {
      throw new Error(`expected an uncompressed byte length of ` + length + ` but got ` + mysize)
    }

    const comprLen = readQuad()
    const compressed = readByteArray(comprLen)
    const decompressed = [...zlib.inflateSync(B.u8(compressed))] // perf?

    return {
      mysize,
      comprLen,
      compressed,
      decompressed,
    }
  }

  const readZlibU16 = (length) => {
    const mysize = readQuad()
    if (mysize !== (length * 2)) {
      throw new Error(`expected an uncompressed byte length of ` + (length * 2) + ` but got ` + mysize)
    }

    const comprLen = readQuad()
    const compressed = readByteArray(comprLen)
    const decompressedU8 = B.u8([...zlib.inflateSync(B.u8(compressed))]) // perf?
    const reader = createBufferReader({data: decompressedU8})
    const decompressed = reader.readWordArray(length)

    return {
      mysize,
      comprLen,
      compressed,
      decompressed,
    }
  }

  const readIkaZlibU8 = (length) => {
    const comprLen = readQuad()
    const compressed = readByteArray(comprLen)
    const decompressed = [...zlib.inflateSync(B.u8(compressed), {finishFlush: zlib.Z_SYNC_FLUSH})] // perf?

    return {
      comprLen,
      compressed,
      decompressed,
    }
  }

  // TODO(chuck): This was added for reading VERGE 2.7 (a.k.a. ika) maps, which
  // do not store the uncompressed size like all the other VERGE engines do.
  // Need to rename this to something better, to help indicate that it does
  // not have the same header format as the rest.
  const readIkaZlibU32 = (length) => {
    const comprLen = readQuad()
    const compressed = readByteArray(comprLen)
    const decompressedU8 = B.u8([...zlib.inflateSync(B.u8(compressed), {finishFlush: zlib.Z_SYNC_FLUSH})]) // perf?
    const reader = createBufferReader({data: decompressedU8})
    const decompressed = reader.readQuadArray(length)

    return {
      comprLen,
      compressed,
      decompressed,
    }
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
    readDouble,
    readDoubleArray,
    readWhitespace,
    readStringLengthEncoded,
    readStringFixed,
    readStringNullTerminated,
    readString,
    readStringAsByte,
    readStringAsWord,
    readStringAsQuad,
    readLine,
    readLines,
    readZlib: readZlibU8,
    readZlibU8,
    readZlibU16,
    readIkaZlibU8,
    readIkaZlibU32,
    get position() {
      return position
    },
    set position(value) {
      position = value
    },
    get length() {
      return buffer.length
    },
    get remaining() {
      return buffer.length - position
    }
  }
}

module.exports = createBufferReader