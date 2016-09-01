"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createDataReader = require('./createDataReader.js')
const fill = require('lodash/fill')

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