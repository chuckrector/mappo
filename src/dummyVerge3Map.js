"use strict"

const filler = require(`./filler`)
const zlib = require(`zlib`)
const {makeBuffer, B} = require(`./makeBuffer`)

const mapWidth = 2
const mapHeight = 3
const signature = `V3MAP\0`
const version = 2
const scriptOffset = 66
const mapname = `My Map Name`
const vspFilename = `intro.vsp`
const musicname = `VANGELIS.MOD`
const renderString = `12E`
const startupscript = `startup script`
const startx = 1
const starty = 2
const numlayers = 3

const layerName = `My Layer Name`
const parallaxX = 1.2
const parallaxY = 1.5
const layerWidth = 4
const layerHeight = 5
const layerLucent = 1
const layerData = filler(layerWidth * layerHeight, 0xdead)
const layerDataCompressed = [...zlib.deflateSync(B.u16(layerData))]
const obsData = filler(layerWidth * layerHeight, 88)
const obsDataCompressed = [...zlib.deflateSync(B.u8(obsData))]
const zonelayerData = filler(layerWidth * layerHeight, 0xbeef)
const zonelayerDataCompressed = [...zlib.deflateSync(B.u16(zonelayerData))]

const numzones = 2
const zoneName = `My Zone Name`
const zoneScript = `zone script`
const zonePercent = 1
const zoneDelay = 2
const zoneMethod = 3

const mapLayer = makeBuffer([
  B.stringFixed(256, layerName),
  B.f64([parallaxX, parallaxY]),
  B.u16([layerWidth, layerHeight]),
  B.u8(layerLucent),
  B.zlibU16(layerData),
])

const mapZone = makeBuffer([
  B.stringFixed(256, zoneName),
  B.stringFixed(256, zoneScript),
  B.u8([zonePercent, zoneDelay, zoneMethod]),
])

const entity = {
  x1: 1,
  y1: 2,
  face: 3,
  obstructable: 4,
  obstruction: 5,
  autoface: 6,
  speed: 7,
  speedct: 8, // pulled from v2. ignored by v3. what is this?
  delayct: 9, // pulled from v2. ignored by v3. what is this?
  wx1: 10,
  wy1: 11,
  wx2: 12,
  wy2: 13,
  wdelay: 14,
  maybeOffset: 15, // ignored by v3. what is this?
  movescript: `move script`,
  chrname: `chr name`,
  description: `description`,
  script: `script`,
}

const mapScript = [1, 2, 3]
const mapScriptsize = mapScript.length
const mapentities = 2
const mapEntity = makeBuffer([
  B.u16([entity.x1, entity.y1]),
  B.u8([
    entity.face,
    entity.obstructable,
    entity.obstruction,
    entity.autoface,
  ]),
  B.u16(entity.speed),
  B.u8([entity.speedct, entity.delayct]),
  B.u16([
    entity.wx1,
    entity.wy1,
    entity.wx2,
    entity.wy2,
    entity.wdelay,
  ]),
  B.u32(entity.maybeOffset),
  B.stringFixed(256, entity.movescript),
  B.stringFixed(256, entity.chrname),
  B.stringFixed(256, entity.description),
  B.stringFixed(256, entity.script),
])

const map = makeBuffer([
  B.string(signature),
  B.u32([version, scriptOffset]),
  B.stringFixed(256, mapname),
  B.stringFixed(256, vspFilename),
  B.stringFixed(256, musicname),
  B.stringFixed(256, renderString),
  B.stringFixed(256, startupscript),
  B.u16([startx, starty]),
  B.u32(numlayers),
  makeBuffer(filler(numlayers, mapLayer)),
  B.zlibU8(obsData),
  B.zlibU16(zonelayerData),
  B.u32(numzones),
  makeBuffer(filler(numzones, mapZone)),
  B.u32(mapentities),
  makeBuffer([mapEntity, mapEntity]),
  // Buffer.from(new Uint32Array([mapScriptsize]).buffer),
  B.u8(mapScript),
])

module.exports = {
  mapWidth,
  mapHeight,
  signature,
  version,
  scriptOffset,
  mapname,
  vspFilename,
  musicname,
  renderString,
  startupscript,
  startx,
  starty,
  numlayers,
  mapLayer,
  layerWidth,
  layerHeight,
  mapZone,
  mapentities,
  mapEntity,
  mapScriptsize,
  mapScript,
  layerName,
  parallaxX,
  parallaxY,
  layerWidth,
  layerHeight,
  layerLucent,
  layerData,
  layerDataCompressed,
  obsData,
  obsDataCompressed,
  zonelayerData,
  zonelayerDataCompressed,
  numzones,
  zoneName,
  zoneScript,
  zonePercent,
  zoneDelay,
  zoneMethod,
  entity,
  map,
}
