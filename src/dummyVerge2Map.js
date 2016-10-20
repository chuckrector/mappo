"use strict"

const filler = require(`./filler`)
const {makeBuffer, B} = require(`./makeBuffer`)

const mapWidth = 2
const mapHeight = 3
const mapHeader = makeBuffer([
  // version
  B.u8([77, 65, 80, 249, 53, 0]),
  // mapEventsOffset
  B.u32(12345),
  // vspFilename
  B.stringFixed(60, `grue0040.vsp`),
  // musicFilename
  B.stringFixed(60, `VANGELIS.MOD`),
  // renderString
  B.stringFixed(20, `12E`),
  // startX, startY
  B.u16([1 ,2]),
  // wrap
  B.u8(1),
  // padding
  B.u8(filler(50, 99)),
])

const rawLayer = [1, ...filler((2 * 3) - 2, 2), 3]
const mapLayers = makeBuffer([
  // layerCount
  B.u8(2),

  // -- first layer info --

  // pmultx, pdivx, pmulty, pdivy
  B.u8([1, 0, 1, 0]),
  // sizex, sizey
  B.u16([2, 3]),
  // trans, hline, padding (2 bytes)
  B.u8([4, 3, 2, 1]),

  // -- second layer info --

  // pmultix, pdivx, pmulty, pdivy
  B.u8([1, 0, 1, 0]),
  // sizex, sizey
  B.u16([2, 3]),
  // trans, hline, padding (2 bytes)
  B.u8([4, 3, 2, 1]),

  // -- first layer compressed data --

  B.compressedU16(rawLayer),

  // -- second layer compressed data --

  B.compressedU16(rawLayer),

  // -- obstruction layer compressed data --

  B.compressedU8(rawLayer),

  // -- zone layer compressed data --

  B.compressedU8(rawLayer),
])

const zone = makeBuffer([
  // zonename
  B.stringFixed(40, `Default`),
  // script, percent, delay, aaa, entityscript
  B.u16([5, 4, 3, 2, 1]),
])

const mapZones = makeBuffer([
  // zoneCount
  B.u32(2),
  makeBuffer(filler(2, zone)),
])

const chrList = makeBuffer([
  // characterFilenameCount
  B.u8(3),
  makeBuffer(filler(3, B.stringFixed(60, `DARIN.CHR`))),
])

const entity = makeBuffer([
  // x, y
  B.u32([2, 1]),
  // tx, ty
  B.u16([4, 3]),
  // facing, moving, movcnt, frame, specframe, chrindex, reset, obsmode1, obsmode2, speed, speedct, delayct
  B.u8(filler(12, 99)),
  // animofs, scriptofs
  B.u32([2, 1]),
  // face, actm, movecode, movescript, ctr, mode, modePadding (2 bytes)
  B.u8(filler(6 + 2, 88)),
  // step, delay, stepctr, delayctr, data1..data6
  B.u16(filler(10, 77)),
  // actscript, expand1..expand4
  B.u32(filler(5, 66)),
  // desc
  B.stringFixed(20, `Description`),
])

const numEntities = 3
const mapEntities = makeBuffer([
  Buffer.from([numEntities]),
  makeBuffer(filler(numEntities, entity))
])

const scripts = makeBuffer([
  // movementScriptCount
  B.u8(5),
  // movementScriptBufferSize
  B.u32(50),
  // movementScriptOffsets
  B.u32([0, 10, 20, 30, 40]),
  // movementScriptBuffer
  B.u8(filler(50, 99)),

  // numthings
  B.u32(0),

  // mapevents
  B.u32(2),
  // scriptOffsets
  B.u32([0, 10]),
  // scriptBufferSize
  B.u32(20),
  // scriptBuffer
  B.u8(filler(20, 88)),
])

const map = makeBuffer([
  mapHeader,
  mapLayers,
  mapZones,
  chrList,
  mapEntities,
  scripts,
])

module.exports = {
  mapWidth,
  mapHeight,
  mapHeader,
  mapLayers,
  zone,
  mapZones,
  chrList,
  entity,
  numEntities,
  mapEntities,
  scripts,
  map,
}
