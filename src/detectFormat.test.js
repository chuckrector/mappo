"use strict"

const expect = require('expect')
const detectFormat = require('./detectFormat')

{
  // can detect v1 BOX.RAW
  const isBoxRaw = {length: 320 * 66}
  const isNotBoxRaw = {length: 1}

  expect(detectFormat(isBoxRaw)).toBe('v1boxraw')
  expect(detectFormat(isNotBoxRaw)).toBe('unknown')
}

{
  // can detect v1 CHR
  const isV1Chr = {length: 16 * 32 * 30}
  const isAlsoV1Chr = {length: 16 * 32 * 20}
  const isNotV1Chr = {length: 1}

  expect(detectFormat(isV1Chr)).toBe('v1chr')
  expect(detectFormat(isAlsoV1Chr)).toBe('v1chr')
  expect(detectFormat(isNotV1Chr)).toBe('unknown')
}

{
  // can detect v1 VERGE.PAL
  const isPalette = {length: 3 * 256}
  const isNotPalette = {length: 1}

  expect(detectFormat(isPalette)).toBe('v1pal')
  expect(detectFormat(isNotPalette)).toBe('unknown')
}
