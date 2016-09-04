"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge2MapLoader = require('../loader/createVerge2MapLoader')
const createVerge2MapConverter = require('./createVerge2MapConverter')
const fill = require('lodash/fill')
const dummyMap = require('../dummyVerge2Map')

{
  // can convert to json
  const loader = createVerge2MapLoader({
    data: dummyMap.map
  })

  const data = loader.load()
  const converter = createVerge2MapConverter(data)
  const json = converter.convertToJson()
  const js = JSON.parse(json)

  expect(js.version).toEqual([77, 65, 80, 249, 53, 0])
  expect(js.vspname).toBe('grue0040.vsp')
  expect(js.musname).toBe('VANGELIS.MOD')
  expect(js.rstring).toBe('12E')
  expect(js.xstart).toBe(1)
  expect(js.ystart).toBe(2)
  expect(js.wrap).toBe(1)
  expect(js.padding).toEqual(fill(Array(50), 99))

  expect(js.numlayers).toBe(2)
  expect(js.layer).toEqual([{
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

  expect(js.layers.length).toBe(2)
  expect(js.layers[0].decompressed.length).toBe(2 * 3)
  expect(js.layers[1].decompressed.length).toBe(2 * 3)
  expect(js.layers[0].decompressed).toEqual([1, 2, 2, 2, 2, 3])
  expect(js.layers[1].decompressed).toEqual([1, 2, 2, 2, 2, 3])

  expect(js.obstruct.decompressed.length).toBe(2 * 3)
  expect(js.zone.decompressed.length).toBe(2 * 3)
  expect(js.obstruct.decompressed).toEqual([1, 2, 2, 2, 2, 3])
  expect(js.zone.decompressed).toEqual([1, 2, 2, 2, 2, 3])

  expect(js.numzones).toBe(2)
  expect(js.zones.length).toBe(2)
  expect(js.zones).toEqual([{
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

  expect(js.nmchr).toBe(3)
  expect(js.chrlist.length).toBe(3)
  expect(js.chrlist).toEqual(fill(Array(3), 'DARIN.CHR'))

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

  expect(js.entities).toBe(3)
  expect(js.entity.length).toBe(3)
  expect(js.entity).toEqual([oneEntity, oneEntity, oneEntity])

  expect(js.nummovescripts).toBe(5)
  expect(js.msbufsize).toBe(50)
  expect(js.msofstbl).toEqual([0, 10, 20, 30, 40])
  expect(js.msbuf).toEqual(fill(Array(50), 99))

  expect(js.numthings).toBe(0)

  expect(js.mapevents).toBe(2)
  expect(js.mapvctbl).toEqual([0, 10])
  expect(js.codesize).toBe(20)
  expect(js.mapvc).toEqual(fill(Array(20), 88))
}