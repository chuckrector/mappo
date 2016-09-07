"use strict"

const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const zlib = require('zlib')

const mapWidth = 2
const mapHeight = 3
const signature = 'V3MAP\0'
const version = 2
const mapname = 'My Map Name'
const vspname = 'intro.vsp'
const musicname = 'VANGELIS.MOD'
const renderstring = '12E'
const startupscript = 'startup script'
const startx = 1
const starty = 2
const numlayers = 3

const layerName = 'My Layer Name'
const parallaxX = 1.2
const parallaxY = 1.5
const layerWidth = 4
const layerHeight = 5
const layerLucent = 1
const layerData = fill(Array(16 * 16), 99)
const layerDataCompressed = [
  ...zlib.deflateSync(Buffer.from(new Uint16Array(layerData).buffer))
]
const obsData = fill(Array(16 * 16), 88)
const obsDataCompressed = [...zlib.deflateSync(Buffer.from(obsData))]
const zonelayerData = fill(Array(16 * 16), 77)
const zonelayerDataCompressed = [
  ...zlib.deflateSync(Buffer.from(new Uint16Array(zonelayerData).buffer))
]

const numzones = 2
const zoneName = 'My Zone Name'
const zoneScript = 'zone script'
const zonePercent = 1
const zoneDelay = 2
const zoneMethod = 3

const mapLayer = Buffer.concat([
  Buffer.from(padEnd(layerName, 256, '\0')),
  Buffer.from(new Float64Array([parallaxX, parallaxY]).buffer),
  Buffer.from(new Uint16Array([layerWidth, layerHeight]).buffer),
  Buffer.from([layerLucent]),
  Buffer.from(new Uint32Array([layerWidth * layerHeight * 2, layerDataCompressed.length]).buffer),
  Buffer.from(layerDataCompressed),
])

const mapZone = Buffer.concat([
  Buffer.from(padEnd(zoneName, 256, '\0')),
  Buffer.from(padEnd(zoneScript, 256, '\0')),
  Buffer.from([zonePercent, zoneDelay, zoneMethod]),
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
  movescript: 'move script',
  chrname: 'chr name',
  description: 'description',
  script: 'script',
}

const mapScript = 'ye olde map script'
const mapScriptsize = mapScript.length
const mapentities = 2
const mapEntity = Buffer.concat([
  Buffer.from(new Uint16Array([entity.x1, entity.y1]).buffer),
  Buffer.from([
    entity.face,
    entity.obstructable,
    entity.obstruction,
    entity.autoface,
  ]),
  Buffer.from(new Uint16Array([entity.speed]).buffer),
  Buffer.from([entity.speedct, entity.delayct]),
  Buffer.from(new Uint16Array([
    entity.wx1,
    entity.wy1,
    entity.wx2,
    entity.wy2,
    entity.wdelay,
  ]).buffer),
  Buffer.from(new Uint32Array([entity.maybeOffset]).buffer),
  Buffer.from(padEnd(entity.movescript, 256, '\0')),
  Buffer.from(padEnd(entity.chrname, 256, '\0')),
  Buffer.from(padEnd(entity.description, 256, '\0')),
  Buffer.from(padEnd(entity.script, 256, '\0')),
])

const map = Buffer.concat([
  Buffer.from(signature.split('').map(c => c.charCodeAt(0))),
  Buffer.from(new Uint32Array([version]).buffer),
  Buffer.from(padEnd(mapname, 256, '\0')),
  Buffer.from(padEnd(vspname, 256, '\0')),
  Buffer.from(padEnd(musicname, 256, '\0')),
  Buffer.from(padEnd(renderstring, 256, '\0')),
  Buffer.from(padEnd(startupscript, 256, '\0')),
  Buffer.from(new Uint16Array([startx, starty]).buffer),
  Buffer.from(new Uint32Array([numlayers]).buffer),
  Buffer.concat(fill(Array(numlayers), mapLayer)),
  Buffer.from(new Uint32Array([layerWidth * layerHeight, obsDataCompressed.length]).buffer),
  Buffer.from(obsDataCompressed),
  Buffer.from(new Uint32Array([layerWidth * layerHeight * 2, zonelayerDataCompressed.length]).buffer),
  Buffer.from(zonelayerDataCompressed),
  Buffer.from(new Uint32Array([numzones]).buffer),
  Buffer.concat([mapZone, mapZone]),
  Buffer.from(new Uint32Array([mapentities]).buffer),
  Buffer.concat([mapEntity, mapEntity]),
  Buffer.from(new Uint32Array([mapScriptsize]).buffer),
  Buffer.from(padEnd(mapScript)),
])

module.exports = {
  mapWidth,
  mapHeight,
  signature,
  version,
  mapname,
  vspname,
  musicname,
  renderstring,
  startupscript,
  startx,
  starty,
  numlayers,
  mapLayer,
  layerWidth,
  layerHeight,
  obsData,
  obsDataCompressed,
  zonelayerData,
  zonelayerDataCompressed,
  numzones,
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
