"use strict"

const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const {makeBuffer, B} = require('./makeBuffer')

const mapWidth = 2
const mapHeight = 3
const mapHeader = makeBuffer([
  B.u8(4),
  B.stringFixed(13, 'HAHN01.VSP'),
  B.stringFixed(13, 'VANGELIS.MOD'),
  B.list(B.u8, [0, 1, 1]),
  B.stringFixed(30, 'Village - Past'),
  B.list(B.u8, [1, 0]),
  B.list(B.u16, [21, 1]),
  B.list(B.u8, [1, 1]),
  B.list(B.u16, [mapWidth, mapHeight]),
  B.u8(0),
  B.list(B.u8, fill(Array(27), 0))
])

const mapBackgroundLayerData = fill(Array(mapWidth * mapHeight), 33)
const mapForegroundLayerData = fill(Array(mapWidth * mapHeight), 44)
const mapObstructionLayerData = fill(Array(mapWidth * mapHeight), 55)
const mapLayers = makeBuffer([
  B.list(B.u16, mapBackgroundLayerData),
  B.list(B.u16, mapForegroundLayerData),
  B.list(B.u8, mapObstructionLayerData),
])

const zone = makeBuffer([
  // zonename
  B.stringFixed(15, 'Default'),
  // padding
  B.u8(0),
  // callevent
  B.u16(1),
  // percent, delay, aaa
  B.list(B.u8, [255, 0, 1]),
  // savedesc
  B.stringFixed(30, 'Rodne'),
  // padding
  B.u8(0),
])

const mapZones = makeBuffer(
  fill(Array(128), zone)
)

const chrList = makeBuffer(
  fill(Array(100), B.stringFixed(13, 'DARIN.CHR'))
)

const entity = makeBuffer([
  // x, y
  B.list(B.u16, [2, 1]),
  // facing, moving, movcnt, framectr, specframe, chrindex, movecode, activmode, obsmode
  B.list(B.u8, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0]),
  // actscript, movescript
  B.list(B.u32, [2, 1]),
  // speed, speedct
  B.list(B.u8, [2, 1]),
  // step..y2
  B.list(B.u16, [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
  // curcmd, cmdarg
  B.list(B.u8, [2, 1]),
  // scriptofs
  B.u32(1),
  // face, chasing, chasespeed, chasedist
  B.list(B.u8, [4, 3, 2, 1]),
  // cx, cy
  B.list(B.u16, [2, 1]),
  // expand
  B.u32(1),
  // entitydesc
  B.stringFixed(20, 'Description'),
])

const numEntities = 3
const mapEntities = makeBuffer(
  fill(Array(numEntities), entity)
)

const scripts = makeBuffer([
  // nummovescripts
  B.u8(5),
  // msbufsize
  B.u32(50),
  // msofstbl
  B.list(B.u32, [0, 10, 20, 30, 40]),
  // msbuf
  B.list(B.u8, fill(Array(50), 99)),
  // numscripts, scriptofstb,
  B.list(B.u32, [3, 0, 10, 20]),
  // mapvc
  B.list(B.u8, fill(Array(30), 88)),
])

const map = Buffer.concat([
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
