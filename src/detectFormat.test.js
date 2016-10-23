"use strict"

const expect = require(`expect`)
const detectFormat = require(`./detectFormat`)
const {makeBuffer, B} = require(`./makeBuffer`)
const filler = require(`./filler`)

const dummyBuffer = totes => B.u8(filler(totes))

{
  // can detect v1 BOX.RAW
  const isBoxRaw = dummyBuffer(320 * 66)
  const isNotBoxRaw = dummyBuffer(255)

  expect(detectFormat(isBoxRaw)).toBe(`v1boxraw`)
  expect(detectFormat(isNotBoxRaw)).toBe(`unknown`)
}

{
  // can detect v1 CHR
  const isV1Chr = {length: 16 * 32 * 30}
  const isAlsoV1Chr = {length: 16 * 32 * 20}
  const isNotV1Chr = dummyBuffer((16 * 32) + 2)

  expect(detectFormat(isV1Chr)).toBe(`v1chr`)
  expect(detectFormat(isAlsoV1Chr)).toBe(`v1chr`)
  expect(detectFormat(isNotV1Chr)).toBe(`unknown`)
}

{
  // can detect v1 VERGE.PAL
  const isPalette = {length: 3 * 256}
  const isNotPalette = dummyBuffer(255)

  expect(detectFormat(isPalette)).toBe(`v1pal`)
  expect(detectFormat(isNotPalette)).toBe(`unknown`)
}

{
  // can detect v1 CR2
  const isCr2 = {length: 96 * 96}
  const isNotCr2 = dummyBuffer(255)

  expect(detectFormat(isCr2)).toBe(`v1cr2`)
  expect(detectFormat(isNotCr2)).toBe(`unknown`)
}

{
  // can detect v1 MAIN.FNT
  const isMainFnt = {length: 9 * 16 * 95}
  const isNotMainFnt = dummyBuffer(255)

  expect(detectFormat(isMainFnt)).toBe(`v1mainfnt`)
  expect(detectFormat(isNotMainFnt)).toBe(`unknown`)
}

{
  // can detect v1 SMALL.FNT
  const isSmallFnt = {length: 7 * 9 * 95}
  const isNotSmallFnt = dummyBuffer(255)

  expect(detectFormat(isSmallFnt)).toBe(`v1smallfnt`)
  expect(detectFormat(isNotSmallFnt)).toBe(`unknown`)
}

{
  // can detect v1 TRANS.TBL
  const isTransTbl = {length: 256 * 256}
  const isNotTransTbl = dummyBuffer(255)

  expect(detectFormat(isTransTbl)).toBe(`v1transtbl`)
  expect(detectFormat(isNotTransTbl)).toBe(`unknown`)
}

{
  // can detect v1 SPEECH.SPC
  expect(detectFormat({length: 32 * 32})).toBe(`v1speechspc`)
  expect(detectFormat({length: 32 * 32 * 2})).toBe(`v1speechspc`)
  expect(detectFormat({length: 32 * 32 * 3})).toBe(`v1speechspc`)
  expect(detectFormat({length: 32 * 32 * 4})).toBe(`v1speechspc`)
  expect(detectFormat({length: 32 * 32 * 5})).toBe(`v1speechspc`)
}

{
  // can detect v1 ITEMICON.DAT
  const isItemIconDat = dummyBuffer(1 + (16 * 16 * 5))
  const isNotItemIconDat = dummyBuffer(16 * 16 * 5)

  expect(detectFormat(isItemIconDat)).toBe(`v1itemicondat`)
  expect(detectFormat(isNotItemIconDat)).toBe(`unknown`)
}

{
  // can detect v1 MISCICON.DAT
  const isMiscIconDat = {length: 1 + (16 * 16) + (24 * 24) + (24 * 40)}
  const isNotMiscIconDat = dummyBuffer(16 * 16 * 7)

  expect(detectFormat(isMiscIconDat)).toBe(`v1miscicondat`)
  expect(detectFormat(isNotMiscIconDat)).toBe(`unknown`)
}

{
  // can detect v1 VSP
  const tileCount = 3
  const isVsp = makeBuffer([
    B.u16(0), // version is ignored by v1
    B.u8(filler(3 * 256, 0)),
    B.u16(tileCount),
    B.u8(filler(16 * 16 * tileCount)),
    B.u16(filler(4 * 100, 0)),
  ])

  expect(detectFormat(isVsp)).toBe(`v1vsp`)
}

{
  // can detect v1 MAP
  const isMap = makeBuffer([
    B.u8(4),
    B.stringFixed(13, `HAHN01.VSP`),
  ])

  expect(detectFormat(isMap)).toBe(`v1map`)
}

{
  // can detect v2 CHR
  const isChr = makeBuffer([
    B.u8(2),
    B.u16([16, 32]),
  ])

  expect(detectFormat(isChr)).toBe(`v2chr`)
}

{
  // can detect v2 VSP w/ version 3
  const isVsp = makeBuffer([
    B.u16(3),
    B.u8(filler(3 * 256, 99)),
    B.u16(1),
    B.compressedU8(filler(16 * 16, 88)),
    B.u16(filler(2 * 4 * 100)),
  ])

  expect(detectFormat(isVsp)).toBe(`v2vsp`)
}

{
  // can detect v2 VSP w/ version 4
  const isVsp = makeBuffer([
    B.u16(4),
    B.u8(filler(3 * 256, 99)),
    B.u16(1),
    B.compressedU8(filler(16 * 16, 88)),
    B.u16(filler(2 * 4 * 100)),
  ])

  expect(detectFormat(isVsp)).toBe(`v2vsp`)
}

{
  // can detect v2 MAP
  const isMap = B.u8([77, 65, 80, 249, 53, 0])

  expect(detectFormat(isMap)).toBe(`v2map`)
}

{
  // can detect v2.7 (ika) MAP
  const isMap = B.u8([77, 65, 80, 249, 54, 0])

  expect(detectFormat(isMap)).toBe(`v27map`)
}

{
  // can detect v2kj CHR
  const frameCount = 1
  const isChr = makeBuffer([
    B.u8(4),
    B.u16([16, 32]),
    B.u16(filler(8)),
    B.u16(frameCount),
    B.u32(2),
    B.string(`F0`),
    B.u32(2),
    B.string(`F0`),
    B.u32(2),
    B.string(`F0`),
    B.u32(2),
    B.string(`F0`),
    B.compressedU16(filler(16 * 32 * frameCount))
  ])

  expect(detectFormat(isChr)).toBe(`v2kjchr`)
}

{
  // can detect v2kj v4 vsp
  const numTiles = 1
  const isVsp = makeBuffer([
    B.u16(4),
    B.u16(numTiles),
    B.u16(filler(16 * 16 * numTiles)),
    B.u16(filler(4 * 100)),
  ])

  expect(detectFormat(isVsp)).toBe(`v2kj4vsp`)
}

{
  // can detect v2kj v5 vsp
  const numTiles = 1
  const isVsp = makeBuffer([
    B.u16(5),
    B.u16(numTiles),
    B.u32(27),
    B.u8(filler(27)),
    B.u16(filler(4 * 100)),
  ])

  expect(detectFormat(isVsp)).toBe(`v2kj5vsp`)
}

{
  // can detect v27/ika v6 8-bit vsp
  const numTiles = 1
  const bytesPerPixel = 1
  const tileWidth = 24
  const tileHeight = 24
  const transparentIndex = 0
  const isVsp = makeBuffer([
    B.u16(6),
    B.u8(bytesPerPixel),
    B.u16([tileWidth, tileHeight]),
    B.u32(numTiles),
    B.stringFixed(64, `v27/ika v6 8-bit vsp`),
    B.u8(filler(256 * 3)),
    B.u8(transparentIndex),
    B.ikaZlibU8(filler(tileWidth * tileHeight * numTiles, 99)),
    B.u16(filler(4 * 100)),
  ])

  expect(detectFormat(isVsp)).toBe(`v27vsp8bit`)
}

{
  // can detect v27/ika v6 32-bit vsp
  const numTiles = 1
  const bytesPerPixel = 4
  const tileWidth = 24
  const tileHeight = 24
  const transparentIndex = 0
  const isVsp = makeBuffer([
    B.u16(6),
    B.u8(bytesPerPixel),
    B.u16([tileWidth, tileHeight]),
    B.u32(numTiles),
    B.stringFixed(64, `v27/ika v6 32-bit vsp`),
    B.ikaZlibU8(filler(tileWidth * tileHeight * numTiles * 4, 99)),
    B.u16(filler(4 * 100)),
    B.u8(filler(400)), // TODO(chuck): figure out wtf this 💩 is for
  ])

  expect(detectFormat(isVsp)).toBe(`v27vsp32bit`)
}

{
  // can detect v3 CHR
  expect(detectFormat(B.u32([5392451, 0]))).toBe(`v3chr`)
}

{
  // can detect v3 VSP
  expect(detectFormat(B.u32([5264214, 0]))).toBe(`v3vsp`)
}

{
  // can detect v3 MAP
  expect(detectFormat(B.string(`V3MAP\0`))).toBe(`v3map`)
}

{
  // can detect mappo tileset
  const thisIs = B.string(JSON.stringify({
    signature: {
      name: `mappo tileset`,
      version: `0.1.0`,
    },
  }))
  const theseAreNot = [
    B.string(JSON.stringify([])),
    B.string(JSON.stringify({})),
    B.string(JSON.stringify({signature: {}})),
    B.string(JSON.stringify({signature: {name: `mappo tileset`}})),
    B.string(JSON.stringify({signature: {name: `mappo map`, version: `0.1.0`}})),
  ]
  expect(detectFormat(thisIs)).toBe(`mappotileset`)
  theseAreNot.forEach(isNot => {
    expect(detectFormat(isNot)).toNotBe(`mappo tileset`)
  })
}

{
  // can detect mappo map
  const thisIs = B.string(JSON.stringify({
    signature: {
      name: `mappo map`,
      version: `0.1.0`,
    },
  }))
  const theseAreNot = [
    B.string(JSON.stringify([])),
    B.string(JSON.stringify({})),
    B.string(JSON.stringify({signature: {}})),
    B.string(JSON.stringify({signature: {name: `mappo map`}})),
    B.string(JSON.stringify({signature: {name: `mappo tileset`, version: `0.1.0`}})),
  ]
  expect(detectFormat(thisIs)).toBe(`mappomap`)
  theseAreNot.forEach(isNot => {
    expect(detectFormat(isNot)).toNotBe(`mappomap`)
  })
}
