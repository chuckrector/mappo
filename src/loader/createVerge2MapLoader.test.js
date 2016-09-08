"use strict"

const expect = require('expect')
const createVerge2MapLoader = require('./createVerge2MapLoader.js')
const padEnd = require('lodash/padEnd')
const fill = require('lodash/fill')
const dummyMap = require('../dummyVerge2Map')

{
  // can load verge2 map
  const loader = createVerge2MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()

  expect(data.version).toEqual([77, 65, 80, 249, 53, 0])
  expect(data.mapEventsOffset).toBe(12345)
  expect(data.vspname).toBe('grue0040.vsp')
  expect(data.musname).toBe('VANGELIS.MOD')
  expect(data.rstring).toBe('12E')
  expect(data.xstart).toBe(1)
  expect(data.ystart).toBe(2)
  expect(data.wrap).toBe(1)
  expect(data.padding).toEqual(fill(Array(50), 99))

  expect(data.numlayers).toBe(2)
  expect(data.layer).toEqual([{
    pmultx: 1,
    pdivx: 0,
    pmulty: 1,
    pdivy: 0,
    sizex: 2,
    sizey: 3,
    trans: 4,
    hline: 3,
    padding: [2, 1],
  }, {
    pmultx: 1,
    pdivx: 0,
    pmulty: 1,
    pdivy: 0,
    sizex: 2,
    sizey: 3,
    trans: 4,
    hline: 3,
    padding: [2, 1],
  }])

  expect(data.layers.length).toBe(2)
  expect(data.layers[0].decompressed.length).toBe(2 * 3)
  expect(data.layers[1].decompressed.length).toBe(2 * 3)
  expect(data.layers[0].decompressed).toEqual([1, 2, 2, 2, 2, 3])
  expect(data.layers[1].decompressed).toEqual([1, 2, 2, 2, 2, 3])

  expect(data.obstruct.decompressed.length).toBe(2 * 3)
  expect(data.zone.decompressed.length).toBe(2 * 3)
  expect(data.obstruct.decompressed).toEqual([1, 2, 2, 2, 2, 3])
  expect(data.zone.decompressed).toEqual([1, 2, 2, 2, 2, 3])

  expect(data.numzones).toBe(2)
  expect(data.zones.length).toBe(2)
  expect(data.zones).toEqual([{
    name: 'Default',
    script: 5,
    percent: 4,
    delay: 3,
    aaa: 2,
    entityscript: 1,
  }, {
    name: 'Default',
    script: 5,
    percent: 4,
    delay: 3,
    aaa: 2,
    entityscript: 1,
  }])

  expect(data.nmchr).toBe(3)
  expect(data.chrlist.length).toBe(3)
  expect(data.chrlist).toEqual(fill(Array(3), 'DARIN.CHR'))

  const oneEntity = {
    x: 2,
    y: 1,
    tx: 4,
    ty: 3,
    facing: 99,
    moving: 99,
    movcnt: 99,
    frame: 99,
    specframe: 99,
    chrindex: 99,
    reset: 99,
    obsmode1: 99,
    obsmode2: 99,
    speed: 99,
    speedct: 99,
    delayct: 99,
    animofs: 2,
    scriptofs: 1,
    face: 88,
    actm: 88,
    movecode: 88,
    movescript: 88,
    ctr: 88,
    mode: 88,
    modePadding: [88, 88],
    step: 77,
    delay: 77,
    stepctr: 77,
    delayctr: 77,
    data1: 77,
    data2: 77,
    data3: 77,
    data4: 77,
    data5: 77,
    data6: 77,
    actscript: 66,
    expand1: 66,
    expand2: 66,
    expand3: 66,
    expand4: 66,
    desc: 'Description',
  }

  expect(data.entities).toBe(3)
  expect(data.entity.length).toBe(3)
  expect(data.entity).toEqual([oneEntity, oneEntity, oneEntity])

  expect(data.nummovescripts).toBe(5)
  expect(data.msbufsize).toBe(50)
  expect(data.msofstbl).toEqual([0, 10, 20, 30, 40])
  expect(data.msbuf).toEqual(fill(Array(50), 99))

  expect(data.numthings).toBe(0)

  expect(data.mapevents).toBe(2)
  expect(data.mapvctbl).toEqual([0, 10])
  expect(data.codesize).toBe(20)
  expect(data.mapvc).toEqual(fill(Array(20), 88))
}
