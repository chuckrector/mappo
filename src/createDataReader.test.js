"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createDataReader = require('./createDataReader.js')
const fill = require('lodash/fill')

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
  reader.readStringVar()
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

  expect(reader.readString(3)).toBe('tic')
  expect(reader.readString(5)).toBe(' tac ')
  expect(reader.readString(3)).toBe('toe')
}

{
  // reading a string should ignore garbage after null terminator
  const reader = createDataReader({
    data: Buffer.from('HAHN01.VSP\0he')
  })

  expect(reader.readString(13)).toBe('HAHN01.VSP')
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

  expect(reader.readStringVar()).toBe('This')
  reader.readWhitespace()
  expect(reader.readStringVar()).toBe('n')
  reader.readWhitespace()
  expect(reader.readStringVar()).toBe('that')
}

{
  // can read variable length string as byte
  const doubleNegMax = -256 * 2
  const reader = createDataReader({
    data: Buffer.from('255 256 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsByte()).toBe(255)
  reader.readWhitespace()
  expect(reader.readStringAsByte()).toBe(0)
  reader.readWhitespace()
  expect(reader.readStringAsByte()).toBe(255)
  reader.readWhitespace()
  expect(reader.readStringAsByte()).toBe(0)
}

{
  // can read variable length string as word
  const doubleNegMax = -65536 * 2
  const reader = createDataReader({
    data: Buffer.from('65535 65536 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsWord()).toBe(65535)
  reader.readWhitespace()
  expect(reader.readStringAsWord()).toBe(0)
  reader.readWhitespace()
  expect(reader.readStringAsWord()).toBe(65535)
}

{
  // can read variable length string as quad
  const doubleNegMax = -4294967296 * 2
  const reader = createDataReader({
    data: Buffer.from('4294967295 4294967296 -1 ' + doubleNegMax)
  })

  expect(reader.readStringAsQuad()).toBe(4294967295)
  reader.readWhitespace()
  expect(reader.readStringAsQuad()).toBe(0)
  reader.readWhitespace()
  expect(reader.readStringAsQuad()).toBe(4294967295)
  reader.readWhitespace()
  expect(reader.readStringAsQuad()).toBe(0)
}