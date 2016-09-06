"use strict"

const expect = require('expect')
const createDataReader = require('./createDataReader.js')
const fill = require('lodash/fill')
const zlib = require('zlib')

{
  // empty buffer is at end
  const reader = createDataReader({
    data: Buffer.from('')
  })

  expect(reader.atEnd()).toBe(true)
}

{
  // at end after whitespace
  const reader = createDataReader({
    data: Buffer.from(' ')
  })

  expect(reader.atEnd()).toBe(false)
  reader.readWhitespace()
  expect(reader.atEnd()).toBe(true)
}

{
  // at end after string
  const reader = createDataReader({
    data: Buffer.from('This')
  })

  expect(reader.atEnd()).toBe(false)
  reader.readString()
  expect(reader.atEnd()).toBe(true)
}

{
  // can read bytes
  const reader = createDataReader({
    data: Buffer.from([3, 2, 1])
  })

  expect(reader.readByte()).toBe(3)
  expect(reader.readByte()).toBe(2)
  expect(reader.readByte()).toBe(1)
}

{
  // can read byte array
  const reader = createDataReader({
    data: Buffer.from([3, 2, 1])
  })

  expect(reader.readByteArray(3)).toEqual([3, 2, 1])
}

const wordArray = [65535, 1, 256]

{
  // can read words
  const reader = createDataReader({
    data: new Uint16Array(wordArray).buffer
  })

  expect(reader.readWord()).toBe(65535)
  expect(reader.readWord()).toBe(1)
  expect(reader.readWord()).toBe(256)
}

{
  // can read word array
  const reader = createDataReader({
    data: new Uint16Array(wordArray).buffer
  })

  expect(reader.readWordArray(3)).toEqual(wordArray)
}

const quadArray = [90000, 1, 65536]

{
  // can read quads
  const reader = createDataReader({
    data: new Uint32Array(quadArray).buffer
  })

  expect(reader.readQuad()).toBe(90000)
  expect(reader.readQuad()).toBe(1)
  expect(reader.readQuad()).toBe(65536)
}

{
  // can read quad array
  const reader = createDataReader({
    data: new Uint32Array(quadArray).buffer
  })

  expect(reader.readQuadArray(3)).toEqual(quadArray)
}

{
  // can read strings
  const reader = createDataReader({
    data: Buffer.from('tic tac toe')
  })

  expect(reader.readStringFixed(3)).toBe('tic')
  expect(reader.readStringFixed(5)).toBe(' tac ')
  expect(reader.readStringFixed(3)).toBe('toe')
}

{
  // reading a string should ignore garbage after null terminator
  const reader = createDataReader({
    data: Buffer.from('HAHN01.VSP\0he')
  })

  expect(reader.readStringFixed(13)).toBe('HAHN01.VSP')
}

{
  // can get length
  const reader = createDataReader({
    data: Buffer.from(fill(Array(13), 0))
  })

  expect(reader.length).toBe(13)
}

{
  let data = fill(Array(13), 99)
  data[data.length - 1] = 88

  // can set position
  const reader = createDataReader({
    data: Buffer.from(data)
  })

  reader.position = data.length - 1
  expect(reader.readByte()).toBe(88)
}

{
  // can read whitespace
  const reader = createDataReader({
    data: Buffer.from(' \n\r\tThis n that')
  })

  expect(reader.readWhitespace()).toBe(' \n\r\t')
}

{
  // can read whitespace at end of data
  const reader = createDataReader({
    data: Buffer.from(' \n\r\t')
  })

  expect(reader.readWhitespace()).toBe(' \n\r\t')
}

{
  // can read variable length string up to space
  const reader = createDataReader({
    data: Buffer.from('This n that')
  })

  expect(reader.readString()).toBe('This')
  expect(reader.readString()).toBe('n')
  expect(reader.readString()).toBe('that')
}

{
  // can read variable length string as byte
  const doubleNegMax = -256 * 2
  const reader = createDataReader({
    data: Buffer.from('255 256 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsByte()).toBe(255)
  expect(reader.readStringAsByte()).toBe(0)
  expect(reader.readStringAsByte()).toBe(255)
  expect(reader.readStringAsByte()).toBe(0)
}

{
  // can read variable length string as word
  const doubleNegMax = -65536 * 2
  const reader = createDataReader({
    data: Buffer.from('65535 65536 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsWord()).toBe(65535)
  expect(reader.readStringAsWord()).toBe(0)
  expect(reader.readStringAsWord()).toBe(65535)
}

{
  // can read variable length string as quad
  const doubleNegMax = -4294967296 * 2
  const reader = createDataReader({
    data: Buffer.from('4294967295 4294967296 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsQuad()).toBe(4294967295)
  expect(reader.readStringAsQuad()).toBe(0)
  expect(reader.readStringAsQuad()).toBe(4294967295)
  expect(reader.readStringAsQuad()).toBe(0)
}

{
  // can read line to end of data
  const reader = createDataReader({
    data: Buffer.from('Attention:')
  })

  expect(reader.readLine()).toBe('Attention:')
}

{
  // can read line to newline
  const reader = createDataReader({
    data: Buffer.from('Attention:\nBacon')
  })

  expect(reader.readLine()).toBe('Attention:')
}

{
  // can read line to carriage return
  const reader = createDataReader({
    data: Buffer.from('Attention:\rBacon')
  })

  expect(reader.readLine()).toBe('Attention:')
}

{
  // can read empty line
  const reader = createDataReader({
    data: Buffer.from('\nBacon')
  })

  expect(reader.readLine()).toBe('')
}

{
  // at match
  const reader = createDataReader({
    data: Buffer.from('// Attention: Bacon')
  })

  expect(reader.atMatch('?')).toBe(false)
  expect(reader.atMatch('/')).toBe(true)
  expect(reader.atMatch('//')).toBe(true)
  expect(reader.atMatch('// Attention:')).toBe(true)
  expect(reader.atMatch('// Attention: Bacon')).toBe(true)
  expect(reader.atMatch('// Attention: Bacon Bits')).toBe(false)
}

{
  // can read compressed word array
  const buffer = Buffer.concat([
    Buffer.from(new Uint32Array([4 * 2]).buffer),
    Buffer.from(new Uint16Array([1, ((16 * 16) - 2) | 0xff00, 2, 3]).buffer),
  ])
  const reader = createDataReader({
    data: buffer
  })

  let decompressedLayout = fill(Array(16 * 16), 2)
  decompressedLayout[0] = 1
  decompressedLayout[255] = 3

  const data = reader.readWordArrayCompressed(16 * 16)
  expect(data.bufsize).toEqual(4 * 2)
  expect(data.decompressed).toEqual(decompressedLayout)
}

{
  // can read compressed byte array
  const buffer = Buffer.concat([
    Buffer.from(new Uint32Array([5]).buffer),
    Buffer.from([1, 0xff, ((16 * 16) - 2), 2, 3]),
  ])
  const reader = createDataReader({
    data: buffer
  })

  let decompressedLayout = fill(Array(16 * 16), 2)
  decompressedLayout[0] = 1
  decompressedLayout[255] = 3

  const data = reader.readByteArrayCompressed(16 * 16)
  expect(data.bufsize).toEqual(5)
  expect(data.decompressed).toEqual(decompressedLayout)
}

{
  // can get remaining # bytes
  const reader = createDataReader({
    data: Buffer.from([1, 2])
  })

  expect(reader.remaining).toBe(2)
  reader.readByte()
  expect(reader.remaining).toBe(1)
  reader.readByte()
  expect(reader.remaining).toBe(0)
}

{
  // can read zlib compressed buffers
  const raw = fill(Array(16 * 16), 99)
  const compressedBuffer = zlib.deflateSync(Buffer.from(raw))
  const buffer = Buffer.concat([
    Buffer.from(new Uint32Array([raw.length, compressedBuffer.length]).buffer),
    compressedBuffer
  ])
  const reader = createDataReader({data: buffer})
  const data = reader.readZlib(16 * 16)

  expect(data.mysize).toBe(raw.length)
  expect(data.comprLen).toBe(compressedBuffer.length)
  expect(data.decompressed.length).toBe(raw.length)
  expect(data.decompressed).toEqual(raw)
}

{
  // throw on zlib uncompressed size mismatch
  const reader = createDataReader({
    data: Buffer.from(new Uint32Array([16 * 16 * 3]).buffer),
  })

  expect(() => {
    reader.readZlib(16 * 16)
  }).toThrow('expected an uncompressed byte length of 256 but got 768')
}