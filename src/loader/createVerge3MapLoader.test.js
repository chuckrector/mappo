"use strict"

const expect = require('expect')
const createVerge3MapLoader = require('./createVerge3MapLoader.js')
const fill = require('lodash/fill')
const dummyMap = require('../dummyVerge3Map')

{
  // can load Verge3 map
  const loader = createVerge3MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.signature).toBe('V3MAP')
  expect(data.version).toBe(dummyMap.version)
  expect(data.scriptoffset).toBe(dummyMap.scriptoffset)
  expect(data.mapname).toBe(dummyMap.mapname)
  expect(data.vspname).toBe(dummyMap.vspname)
  expect(data.musicname).toBe(dummyMap.musicname)
  expect(data.renderstring).toBe(dummyMap.renderstring)
  expect(data.startupscript).toBe(dummyMap.startupscript)
  expect(data.startx).toBe(dummyMap.startx)
  expect(data.starty).toBe(dummyMap.starty)
  expect(data.numlayers).toBe(dummyMap.numlayers)

  expect(data.layers).toEqual(
    fill(Array(dummyMap.numlayers), {
      layername: dummyMap.layerName,
      parallax_x: dummyMap.parallaxX,
      parallax_y: dummyMap.parallaxY,
      width: dummyMap.layerWidth,
      height: dummyMap.layerHeight,
      lucent: dummyMap.layerLucent,
      tiledata: {
        mysize: dummyMap.layerWidth * dummyMap.layerHeight * 2,
        comprLen: dummyMap.layerDataCompressed.length,
        compressed: dummyMap.layerDataCompressed,
        decompressed: dummyMap.layerData,
      }
    })
  )
  expect(data.obslayer.decompressed).toEqual(dummyMap.obsData)
  expect(data.zonelayer.decompressed).toEqual(dummyMap.zonelayerData)
  expect(data.numzones).toBe(dummyMap.numzones)
  expect(data.zones).toEqual(fill(Array(dummyMap.numzones), {
    name: dummyMap.zoneName,
    script: dummyMap.zoneScript,
    percent: dummyMap.zonePercent,
    delay: dummyMap.zoneDelay,
    method: dummyMap.zoneMethod,
  }))
  expect(data.mapentities).toEqual(dummyMap.mapentities)
  expect(data.entity).toEqual(fill(Array(dummyMap.mapentities), dummyMap.entity))
  // expect(data.scriptsize).toEqual(dummyMap.mapScriptsize)
  expect(data.script).toEqual(dummyMap.mapScript)
}
