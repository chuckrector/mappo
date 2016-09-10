"use strict"

const expect = require('expect')
const createVerge1MapLoader = require('./createVerge1MapLoader.js')
const fill = require('lodash/fill')
const dummyMap = require('../dummyVerge1Map')

{
  // can load header
  const loader = createVerge1MapLoader({
    data: dummyMap.map
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
  expect(data.xsize).toBe(dummyMap.mapWidth)
  expect(data.ysize).toBe(dummyMap.mapHeight)
  expect(data.b).toBe(0)
  expect(data.padding).toEqual(fill(Array(27), 0))
}

{
  // can load map layers
  const loader = createVerge1MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.map0).toEqual(dummyMap.mapBackgroundLayerData)
  expect(data.map1).toEqual(dummyMap.mapForegroundLayerData)
  expect(data.mapp).toEqual(dummyMap.mapObstructionLayerData)
}

{
  // can load map zones
  const loader = createVerge1MapLoader({
    data: dummyMap.map
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

{
  // can load chr list
  const loader = createVerge1MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.chrlist.length).toBe(100)
  data.chrlist.forEach((chr) => {
    expect(chr).toBe('DARIN.CHR')
  })
}

{
  // can load entities
  const loader = createVerge1MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.entities).toBe(3)
  expect(data.party.length).toBe(data.entities)
}

{
  // can load scripts
  const loader = createVerge1MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.nummovescripts).toBe(5)
  expect(data.msbufsize).toBe(50)
  expect(data.msofstbl).toEqual([0, 10, 20, 30, 40])
  expect(data.msbuf).toEqual(fill(Array(50), 99))
  expect(data.numscripts).toBe(3)
  expect(data.scriptofstbl).toEqual([0, 10, 20])
  expect(data.mapvc).toEqual(fill(Array(30), 88))
}