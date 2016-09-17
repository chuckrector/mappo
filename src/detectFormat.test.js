"use strict"

const expect = require('expect')
const detectFormat = require('./detectFormat')
const {makeBuffer, B} = require('./makeBuffer')
const filler = require('./filler')

const dummyBuffer = totes => B.u8(filler(totes))

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

{
  // can detect v1 ITEMICON.DAT
  const isItemIconDat = {length: 1 + (16 * 16 * 5)}
  const isNotItemIconDat = dummyBuffer(16 * 16 * 5)

  expect(detectFormat(isItemIconDat)).toBe('v1itemicondat')
  expect(detectFormat(isNotItemIconDat)).toBe('unknown')
}

{
  // can detect v1 MISCICON.DAT
  const isMiscIconDat = {length: 1 + (16 * 16) + (24 * 24) + (24 * 40)}
  const isNotMiscIconDat = dummyBuffer(16 * 16 * 7)

  expect(detectFormat(isMiscIconDat)).toBe('v1miscicondat')
  expect(detectFormat(isNotMiscIconDat)).toBe('unknown')
}

  // version: T.u16,
  // palette: T.list(T.u8, 256 * 3),
  // numtiles: T.u16,
  // vsp0: T.list(T.u8, ({record}) => record.numtiles * 16 * 16),
  // va0: T.list(V1_VSPANIM, 100),

{
  // can detect v1 VSP
  const numtiles = 3
  const isVsp = makeBuffer([
    B.u16(0), // version is ignored by v1
    B.u8(filler(3 * 256, 0)),
    B.u16(numtiles),
    B.u8(filler(16 * 16 * numtiles)),
    B.u16(filler(4 * 100, 0)),
  ])

  expect(detectFormat(isVsp)).toBe('v1vsp')
}
