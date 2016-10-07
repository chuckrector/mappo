"use strict"

const expect = require(`expect`)
const asset = require(`./asset`)
const {makeBuffer, B} = require(`./makeBuffer`)
const filler = require(`./filler`)
const createMappoTileset = require(`./createMappoTileset`)
const createMappoTilesetRaw32bitData = require(`./createMappoTilesetRaw32bitData`)

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

  expect(mappoTileset.tileWidth).toBe(16)
  expect(mappoTileset.tileHeight).toBe(16)
  expect(mappoTileset.numTiles).toBe(numtiles)
  expect(createMappoTilesetRaw32bitData(v1vsp).length).toBe(16 * 16 * 4 * numtiles)
}

{
  // can create from v2 vsp
  const numTiles = 3
  const buffer = makeBuffer([
    B.u16(0), // version
    B.u8(filler(3 * 256)),
    B.u16(numTiles),
    B.compressedU8(filler(16 * 16 * numTiles, 99)),
    B.u8(filler(2 * 4 * 100, 88)), // 100 vsp anims
  ])

  const v2vsp = asset.fromBuffer(buffer, asset.v2vsp)
  const mappoTileset = createMappoTileset({tileset: v2vsp})

  expect(mappoTileset.tileWidth).toBe(16)
  expect(mappoTileset.tileHeight).toBe(16)
  expect(mappoTileset.numTiles).toBe(numTiles)
  expect(createMappoTilesetRaw32bitData(v2vsp).length).toBe(16 * 16 * 4 * numTiles)
}

{
  // can create from v3 vsp
  const numTiles = 3
  const tileSize = 32
  const buffer = makeBuffer([
    // sig/version/tilesize/format/#tiles/compression
    B.u32([0, 0, tileSize, 0, numTiles, 1]),
    B.zlibU8(filler(tileSize * tileSize * 3 * numTiles)),
    B.u32(1), // #anims
    B.stringFixed(256, `vsp anim name`),
    B.u32([0, 0, 0, 0]), // start/finish/delay/mode
    B.u32(1), // #obs
    B.zlibU8(filler(tileSize * tileSize)),
  ])

  const v3vsp = asset.fromBuffer(buffer, asset.v3vsp)
  const mappoTileset = createMappoTileset({tileset: v3vsp})

  expect(mappoTileset.tileWidth).toBe(tileSize)
  expect(mappoTileset.tileHeight).toBe(tileSize)
  expect(mappoTileset.numTiles).toBe(numTiles)
  expect(createMappoTilesetRaw32bitData(v3vsp).length).toBe(tileSize * tileSize * 4 * numTiles)
}
