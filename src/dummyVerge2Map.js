"use strict"

const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')

const mapWidth = 2
const mapHeight = 3
const mapHeader = Buffer.concat([
  // version (6 + 4 bytes)
  Buffer.from([77, 65, 80, 249, 53, 0, 209, 36, 0, 0]),
  // vspname
  Buffer.from(padEnd('grue0040.vsp', 60, '\0')),
  // musname
  Buffer.from(padEnd('VANGELIS.MOD', 60, '\0')),
  // rstring
  Buffer.from(padEnd('12E', 20, '\0')),
  // xstart, ystart
  Buffer.from(new Uint16Array([1, 2]).buffer),
  // wrap
  Buffer.from([1]),
  // padding
  Buffer.from(fill(Array(50), 99)),
])

const mapLayers = Buffer.concat([
  // numlayers
  Buffer.from([2]),

  // -- first layer info --

  // pmultx, pdivx, pmulty, pdivy
  Buffer.from([1, 0, 1, 0]),
  // sizex, sizey
  Buffer.from(new Uint16Array([2, 3]).buffer),
  // trans, hline, padding (2 bytes)
  Buffer.from([4, 3, 2, 1]),

  // -- second layer info --

  // pmultix, pdivx, pmulty, pdivy
  Buffer.from([1, 0, 1, 0]),
  // sizex, sizey
  Buffer.from(new Uint16Array([2, 3]).buffer),
  // trans, hline, padding (2 bytes)
  Buffer.from([4, 3, 2, 1]),

  // -- first layer compressed data --

  Buffer.from(new Uint32Array([4 * 2]).buffer),
  Buffer.from(new Uint16Array([1, ((2 * 3) - 2) | 0xff00, 2, 3]).buffer),

  // -- second layer compressed data --

  Buffer.from(new Uint32Array([4 * 2]).buffer),
  Buffer.from(new Uint16Array([1, ((2 * 3) - 2) | 0xff00, 2, 3]).buffer),

  // -- obstruction layer compressed data --

  Buffer.from(new Uint32Array([5]).buffer),
  Buffer.from([1, 0xff, ((2 * 3) - 2), 2, 3]),

  // -- zone layer compressed data --

  Buffer.from(new Uint32Array([5]).buffer),
  Buffer.from([1, 0xff, ((2 * 3) - 2), 2, 3]),
])

const zone = Buffer.concat([
  // zonename
  Buffer.from(padEnd('Default', 40, '\0')),
  // script, percent, delay, aaa, entityscript
  Buffer.from(new Uint16Array([5, 4, 3, 2, 1]).buffer),
])

const mapZones = Buffer.concat([
  // numzones
  Buffer.from(new Uint32Array([2]).buffer),
  Buffer.concat(fill(Array(2), zone)),
])

const chrList = Buffer.concat([
  // nmchr
  Buffer.from([3]),
  Buffer.concat(fill(Array(3), Buffer.from(padEnd('DARIN.CHR', 60, '\0')))),
])

const entity = Buffer.concat([
  // x, y
  Buffer.from(new Uint32Array([2, 1]).buffer),
  // tx, ty
  Buffer.from(new Uint16Array([4, 3]).buffer),
  // facing, moving, movcnt, frame, specframe, chrindex, reset, obsmode1, obsmode2, speed, speedct, delayct
  Buffer.from(fill(Array(12), 99)),
  // animofs, scriptofs
  Buffer.from(new Uint32Array([2, 1]).buffer),
  // face, actm, movecode, movescript, ctr, mode, modePadding (2 bytes)
  Buffer.from(fill(Array(6 + 2), 88)),
  // step, delay, stepctr, delayctr, data1..data6
  Buffer.from(new Uint16Array(fill(Array(10), 77)).buffer),
  // actscript, expand1..expand4
  Buffer.from(new Uint32Array(fill(Array(5), 66)).buffer),
  // desc
  Buffer.from(padEnd('Description', 20, '\0')),
])

const numEntities = 3
const mapEntities = Buffer.concat([
  Buffer.from([numEntities]),
  Buffer.concat(fill(Array(numEntities), entity))
])

const scripts = Buffer.concat([
  // nummovescripts
  Buffer.from([5]),
  // msbufsize
  Buffer.from(new Uint32Array([50]).buffer),
  // msofstbl
  Buffer.from(new Uint32Array([0, 10, 20, 30, 40]).buffer),
  // msbuf
  Buffer.from(fill(Array(50), 99)),

  // numthings
  Buffer.from(new Uint32Array([0]).buffer),

  // mapevents
  Buffer.from(new Uint32Array([2]).buffer),
  // mapvctbl
  Buffer.from(new Uint32Array([0, 10]).buffer),
  // codesize
  Buffer.from(new Uint32Array([20]).buffer),
  // mapvc
  Buffer.from(fill(Array(20), 88)),
])

const map = Buffer.concat([
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
  // mapBackgroundLayerData,
  // mapForegroundLayerData,
  // mapObstructionLayerData,
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
