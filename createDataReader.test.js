"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createDataReader = require('./createDataReader.js')

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