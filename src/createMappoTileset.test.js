"use strict"

const expect = require('expect')
const asset = require('./asset')
const {makeBuffer, B} = require('./makeBuffer')
const filler = require('./filler')
const createMappoTileset = require('./createMappoTileset')

{
  // can create from v1 vsp
  const numtiles = 3
  const buffer = makeBuffer([
    B.u16(0), // version
    B.u8(filler(3 * 256)),
    B.u16(numtiles),
    B.u8(filler(16 * 16 * numtiles, 99)),
    B.u8(filler(2 * 4 * 100, 88)), // 100 vsp anims
  ])

  const v1vsp = asset.fromBuffer(buffer, asset.v1vsp)
  const mappoTileset = createMappoTileset({tileset: v1vsp})

  expect(mappoTileset.raw32bitData.length).toBe(16 * 16 * 4 * numtiles)
}
