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

{
  // can detect v1 CR2
  const isCr2 = {length: 96 * 96}
  const isNotCr2 = {length: 1}

  expect(detectFormat(isCr2)).toBe('v1cr2')
  expect(detectFormat(isNotCr2)).toBe('unknown')
}

{
  // can detect v1 MAIN.FNT
  const isMainFnt = {length: 9 * 16 * 95}
  const isNotMainFnt = {length: 1}

  expect(detectFormat(isMainFnt)).toBe('v1mainfnt')
  expect(detectFormat(isNotMainFnt)).toBe('unknown')
}

{
  // can detect v1 SMALL.FNT
  const isSmallFnt = {length: 7 * 9 * 95}
  const isNotSmallFnt = {length: 1}

  expect(detectFormat(isSmallFnt)).toBe('v1smallfnt')
  expect(detectFormat(isNotSmallFnt)).toBe('unknown')
}

{
  // can detect v1 TRANS.TBL
  const isTransTbl = {length: 256 * 256}
  const isNotTransTbl = {length: 1}

  expect(detectFormat(isTransTbl)).toBe('v1transtbl')
  expect(detectFormat(isNotTransTbl)).toBe('unknown')
}

{
  // can detect v1 SPEECH.SPC
  expect(detectFormat({length: 32 * 32})).toBe('v1speechspc')
  expect(detectFormat({length: 32 * 32 * 2})).toBe('v1speechspc')
  expect(detectFormat({length: 32 * 32 * 3})).toBe('v1speechspc')
  expect(detectFormat({length: 32 * 32 * 4})).toBe('v1speechspc')
  expect(detectFormat({length: 32 * 32 * 5})).toBe('v1speechspc')
}