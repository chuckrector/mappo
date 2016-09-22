"use strict"

const expect = require('expect')
const asset = require('./asset')
const {makeBuffer, B} = require('./makeBuffer')
const filler = require('./filler')
const createMappoMap = require('./createMappoMap')

{
  // can create from v1 map
  const v1zone = makeBuffer([
    B.stringFixed(15, 'zone'),
    B.u8(0),
    B.u16(0),
    B.u8([0, 0, 0]),
    B.stringFixed(30, 'savedesc'),
    B.u8(0),
  ])

  const buffer = makeBuffer([
    B.u8(0),
    B.stringFixed(13, 'test.vsp'),
    B.stringFixed(13, 'music.mod'),
    B.u8([0, 1, 1]),
    B.stringFixed(30, 'level name'),
    B.u8([0, 0]),
    B.u16([0, 0]), // startx/starty
    B.u8([0, 0]),
    B.u16([2, 3]),
    B.u8(filler(28)),
    B.u16(filler(2 * 3, 77)),
    B.u16(filler(2 * 3, 88)),
    B.u8(filler(2 * 3, 99)),
    makeBuffer(filler(128, v1zone)),
    makeBuffer(filler(100, B.stringFixed(13, 'chr'))),
    B.u32(1), // entities
    B.u8(filler(88)), // one entity
    B.u8(1), // nummovescripts
    B.u32(1), // msbufsize
    B.u32(0), // msofstbl, one offset
    B.u8(0), // msbuf, msbufsize bytes
    B.u32(1), // numscripts
    B.u32(0), // scriptofstbl, one script
    B.u8(0), // mapvc
  ])

  const v1map = asset.fromBuffer(buffer, asset.v1map)
  const mappoMap = createMappoMap({
    map: v1map
  })

  expect(mappoMap.width).toBe(2)
  expect(mappoMap.height).toBe(3)
  expect(mappoMap.tileLayers.length).toBe(2)
  expect(mappoMap.tileLayers[0].description).toBe('Background')
  expect(mappoMap.tileLayers[0].tileIndexGrid).toEqual(filler(2 * 3, 77))
  expect(mappoMap.tileLayers[1].description).toBe('Foreground')
  expect(mappoMap.tileLayers[1].tileIndexGrid).toEqual(filler(2 * 3, 88))
}