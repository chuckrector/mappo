"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1MapLoader = require('../loader/createVerge1MapLoader')
const createVerge1MapConverter = require('./createVerge1MapConverter')
const fill = require('lodash/fill')
const dummyMap = require('../dummyVerge1Map')

{
  // can load header
  const loader = createVerge1MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()
  const converter = createVerge1MapConverter(data)
  const json = converter.convertToJson()
  const js = JSON.parse(json)

  expect(js.version).toBe(4)
  expect(js.vsp0name).toBe('HAHN01.VSP')
  expect(js.musname).toBe('VANGELIS.MOD')
  expect(js.layerc).toBe(0)
  expect(js.pmultx).toBe(1)
  expect(js.pdivx).toBe(1)
  expect(js.levelname).toBe('Village - Past')
  expect(js.showname).toBe(1)
  expect(js.saveflag).toBe(0)
  expect(js.startx).toBe(21)
  expect(js.starty).toBe(1)
  expect(js.hide).toBe(1)
  expect(js.warp).toBe(1)
  expect(js.xsize).toBe(dummyMap.mapWidth)
  expect(js.ysize).toBe(dummyMap.mapHeight)
  expect(js.b).toBe(0)
  expect(js.padding).toEqual(fill(Array(27), 0))

  expect(js.map0).toEqual(dummyMap.mapBackgroundLayerData)
  expect(js.map1).toEqual(dummyMap.mapForegroundLayerData)
  expect(js.mapp).toEqual(dummyMap.mapObstructionLayerData)

  expect(js.zone.length).toBe(128)
  js.zone.forEach((zone) => {
    expect(zone.zonename).toBe('Default')
    expect(zone.callevent).toBe(1)
    expect(zone.percent).toBe(255)
    expect(zone.delay).toBe(0)
    expect(zone.aaa).toBe(1)
    expect(zone.savedesc).toBe('Rodne')
  })

  expect(js.chrlist.length).toBe(100)
  js.chrlist.forEach((chr) => {
    expect(chr).toBe('DARIN.CHR')
  })

  expect(js.entities).toBe(3)
  expect(js.party.length).toBe(js.entities)

  expect(js.nummovescripts).toBe(5)
  expect(js.msbufsize).toBe(50)
  expect(js.msofstbl).toEqual([0, 10, 20, 30, 40])
  expect(js.msbuf).toEqual(fill(Array(50), 99))
  expect(js.numscripts).toBe(3)
  expect(js.scriptofstbl).toEqual([0, 10, 20])
  expect(js.mapvc).toEqual(fill(Array(30), 88))
}