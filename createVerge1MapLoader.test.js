"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1MapLoader = require('./createVerge1MapLoader.js')
const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')

const mapWidth = 2
const mapHeight = 3
const mapHeader = Buffer.concat([
  Buffer.from([4]),
  Buffer.from(padEnd('HAHN01.VSP', 13, '\0')),
  Buffer.from(padEnd('VANGELIS.MOD', 13, '\0')),
  Buffer.from([0, 1, 1]),
  Buffer.from(padEnd('Village - Past', 30, '\0')),
  Buffer.from([1, 0]),
  Buffer.from(new Uint16Array([21, 1]).buffer),
  Buffer.from([1, 1]),
  Buffer.from(new Uint16Array([mapWidth, mapHeight]).buffer),
  Buffer.from([0]),
  Buffer.from(fill(Array(27), 0))
])

const mapBackgroundLayerData = fill(Array(mapWidth * mapHeight), 33)
const mapForegroundLayerData = fill(Array(mapWidth * mapHeight), 44)
const mapObstructionLayerData = fill(Array(mapWidth * mapHeight), 55)
const mapLayers = Buffer.concat([
  Buffer.from(new Uint16Array(mapBackgroundLayerData).buffer),
  Buffer.from(new Uint16Array(mapForegroundLayerData).buffer),
  Buffer.from(mapObstructionLayerData)
])

const zone = Buffer.concat([
  // zonename
  Buffer.from(padEnd('Default', 15, '\0')),
  // padding
  Buffer.from('\0'),
  // callevent
  Buffer.from(new Uint16Array([1]).buffer),
  // percent, delay, aaa
  Buffer.from([255, 0, 1]),
  // savedesc
  Buffer.from(padEnd('Rodne', 30, '\0')),
  // padding
  Buffer.from('\0'),
])

const mapZones = Buffer.concat(
  fill(Array(128), zone)
)

const map = Buffer.concat([
  mapHeader,
  mapLayers,
  mapZones,
])

{
  // can load header
  const loader = createVerge1MapLoader({
    data: map
  })

  const data = loader.load()

  expect(data.version).toBe(4)
  expect(data.vsp0name).toBe('HAHN01.VSP')
  expect(data.musname).toBe('VANGELIS.MOD')
  expect(data.layerc).toBe(0)
  expect(data.pmultx).toBe(1)
  expect(data.pdivx).toBe(1)
  expect(data.levelname).toBe('Village - Past')
  expect(data.showname).toBe(1)
  expect(data.saveflag).toBe(0)
  expect(data.startx).toBe(21)
  expect(data.starty).toBe(1)
  expect(data.hide).toBe(1)
  expect(data.warp).toBe(1)
  expect(data.xsize).toBe(mapWidth)
  expect(data.ysize).toBe(mapHeight)
  expect(data.b).toBe(0)
  expect(data.padding).toEqual(fill(Array(27), 0))
}

{
  // can load map layers
  const loader = createVerge1MapLoader({
    data: map
  })

  const data = loader.load()

  expect(data.map0).toEqual(mapBackgroundLayerData)
  expect(data.map1).toEqual(mapForegroundLayerData)
  expect(data.mapp).toEqual(mapObstructionLayerData)
}

{
  // can load map zones
  const loader = createVerge1MapLoader({
    data: map
  })

  const data = loader.load()

  expect(data.zone.length).toBe(128)
  data.zone.forEach((zone) => {
    expect(zone.zonename).toBe('Default')
    expect(zone.callevent).toBe(1)
    expect(zone.percent).toBe(255)
    expect(zone.delay).toBe(0)
    expect(zone.aaa).toBe(1)
    expect(zone.savedesc).toBe('Rodne')
  })
}