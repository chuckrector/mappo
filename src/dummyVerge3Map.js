"use strict"

const filler = require(`./filler`)
const zlib = require(`zlib`)
const {makeBuffer, B} = require(`./makeBuffer`)

const mapWidth = 2
const mapHeight = 3
const signature = `V3MAP\0`
const version = 2
const scriptOffset = 66
const description = `My Map Name`
const vspFilename = `intro.vsp`
const musicFilename = `VANGELIS.MOD`
const renderString = `12E`
const startupScript = `startup script`
const startX = 1
const startY = 2
const layerCount = 3

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
const zoneLayerData = filler(layerWidth * layerHeight, 0xbeef)
const zoneLayerDataCompressed = [...zlib.deflateSync(B.u16(zoneLayerData))]

const zoneCount = 2
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
  speedCounter: 8, // pulled from v2. ignored by v3. what is this?
  delayCounter: 9, // pulled from v2. ignored by v3. what is this?
  wander: {
    x1: 10,
    y1: 11,
    x2: 12,
    y2: 13,
    delay: 14,
  },
  maybeOffset: 15, // ignored by v3. what is this?
  movementScript: `move script`,
  chrname: `chr name`,
  description: `description`,
  script: `script`,
}

const mapScript = [1, 2, 3]
const mapScriptsize = mapScript.length
const entityCount = 2
const mapEntity = makeBuffer([
  B.u16([entity.x1, entity.y1]),
  B.u8([
    entity.face,
    entity.obstructable,
    entity.obstruction,
    entity.autoface,
  ]),
  B.u16(entity.speed),
  B.u8([entity.speedCounter, entity.delayCounter]),
  B.u16([
    entity.wander.x1,
    entity.wander.y1,
    entity.wander.x2,
    entity.wander.y2,
    entity.wander.delay,
  ]),
  B.u32(entity.maybeOffset),
  B.stringFixed(256, entity.movementScript),
  B.stringFixed(256, entity.chrname),
  B.stringFixed(256, entity.description),
  B.stringFixed(256, entity.script),
])

const map = makeBuffer([
  B.string(signature),
  B.u32([version, scriptOffset]),
  B.stringFixed(256, description),
  B.stringFixed(256, vspFilename),
  B.stringFixed(256, musicFilename),
  B.stringFixed(256, renderString),
  B.stringFixed(256, startupScript),
  B.u16([startX, startY]),
  B.u32(layerCount),
  makeBuffer(filler(layerCount, mapLayer)),
  B.zlibU8(obsData),
  B.zlibU16(zoneLayerData),
  B.u32(zoneCount),
  makeBuffer(filler(zoneCount, mapZone)),
  B.u32(entityCount),
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
  description,
  vspFilename,
  musicFilename,
  renderString,
  startupScript,
  startX,
  startY,
  layerCount,
  mapLayer,
  layerWidth,
  layerHeight,
  mapZone,
  entityCount,
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
  zoneLayerData,
  zoneLayerDataCompressed,
  zoneCount,
  zoneName,
  zoneScript,
  zonePercent,
  zoneDelay,
  zoneMethod,
  entity,
  map,
}
