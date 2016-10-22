"use strict"

const filler = require(`./filler`)
const {makeBuffer, B} = require(`./makeBuffer`)

const mapWidth = 2
const mapHeight = 3
const mapHeader = makeBuffer([
  B.u8(4),
  B.stringFixed(13, `HAHN01.VSP`),
  B.stringFixed(13, `VANGELIS.MOD`),
  B.u8([0, 1, 1]),
  B.stringFixed(30, `Village - Past`),
  B.u8([1, 0]),
  B.u16([21, 1]),
  B.u8([1, 1]),
  B.u16([mapWidth, mapHeight]),
  B.u8(0),
  B.u8(filler(27, 0))
])

const mapBackgroundLayerData = filler(mapWidth * mapHeight, 33)
const mapForegroundLayerData = filler(mapWidth * mapHeight, 44)
const mapObstructionLayerData = filler(mapWidth * mapHeight, 55)
const mapLayers = makeBuffer([
  B.u16(mapBackgroundLayerData),
  B.u16(mapForegroundLayerData),
  B.u8(mapObstructionLayerData),
])

const zone = makeBuffer([
  // zonename
  B.stringFixed(15, `Default`),
  // padding
  B.u8(0),
  // callevent
  B.u16(1),
  // percent, delay, aaa
  B.u8([255, 0, 1]),
  // savedesc
  B.stringFixed(30, `Rodne`),
  // padding
  B.u8(0),
])

const mapZones = makeBuffer(
  filler(128, zone)
)

const chrList = makeBuffer(
  filler(100, B.stringFixed(13, `DARIN.CHR`))
)

const entity = makeBuffer([
  // x, y
  B.u16([2, 1]),
  // facing, moving, movementCounter, frameCounter, specframe, chrindex, movecode, activmode, obsmode
  B.u8([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0]),
  // actscript, movescript
  B.u32([2, 1]),
  // speed, speedct
  B.u8([2, 1]),
  // step..y2
  B.u16([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
  // curcmd, cmdarg
  B.u8([2, 1]),
  // scriptofs
  B.u32(1),
  // face, chasing, chasespeed, chasedist
  B.u8([4, 3, 2, 1]),
  // cx, cy
  B.u16([2, 1]),
  // expand
  B.u32(1),
  // entitydesc
  B.stringFixed(20, `Description`),
])

const numEntities = 3
const mapEntities = makeBuffer(
  filler(numEntities, entity)
)

const scripts = makeBuffer([
  // movementScriptCount
  B.u8(5),
  // movementScriptBufferSize
  B.u32(50),
  // movementScriptOffsets
  B.u32([0, 10, 20, 30, 40]),
  // movementScriptBuffer
  B.u8(filler(50, 99)),
  // scriptCount, scriptofstb,
  B.u32([3, 0, 10, 20]),
  // scriptBuffer
  B.u8(filler(30, 88)),
])

const map = makeBuffer([
  mapHeader,
  mapLayers,
  mapZones,
  chrList,
  B.u32(numEntities),
  mapEntities,
  scripts,
])

module.exports = {
  mapWidth,
  mapHeight,
  mapHeader,
  mapBackgroundLayerData,
  mapForegroundLayerData,
  mapObstructionLayerData,
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
