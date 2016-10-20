"use strict"

const expect = require(`expect`)
const asset = require(`./asset`)
const {makeBuffer, B} = require(`./makeBuffer`)
const filler = require(`./filler`)
const createMappoMap = require(`./createMappoMap`)

{
  // can create from v1 map
  const v1zone = makeBuffer([
    B.stringFixed(15, `zone`),
    B.u8(0),
    B.u16(0),
    B.u8([0, 0, 0]),
    B.stringFixed(30, `savedesc`),
    B.u8(0),
  ])

  const mul = 2
  const div = 3
  const buffer = makeBuffer([
    B.u8(0),
    B.stringFixed(13, `test.vsp`),
    B.stringFixed(13, `music.mod`),
    B.u8([1, mul, div]),
    B.stringFixed(30, `level name`),
    B.u8([0, 0]),
    B.u16([0, 0]), // startX/startY
    B.u8([0, 0]),
    B.u16([2, 3]),
    B.u8(filler(28)),
    B.u16(filler(2 * 3, 77)),
    B.u16(filler(2 * 3, 88)),
    B.u8(filler(2 * 3, 99)),
    makeBuffer(filler(128, v1zone)),
    makeBuffer(filler(100, B.stringFixed(13, `chr`))),
    B.u32(1), // entities
    B.u8(filler(88)), // one entity
    B.u8(1), // movementScriptCount
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

  expect(mappoMap.tilesetFilename).toBe(`test.vsp`)
  expect(mappoMap.tileLayers.length).toBe(2)
  expect(mappoMap.mapLayerOrder).toEqual([0, 1])

  expect(mappoMap.tileLayers[0].description).toBe(`Background`)
  expect(mappoMap.tileLayers[0].tileIndexGrid).toEqual(filler(2 * 3, 77))
  expect(mappoMap.tileLayers[0].width).toBe(2)
  expect(mappoMap.tileLayers[0].height).toBe(3)
  expect(mappoMap.tileLayers[0].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[1].description).toBe(`Foreground`)
  expect(mappoMap.tileLayers[1].tileIndexGrid).toEqual(filler(2 * 3, 88))
  expect(mappoMap.tileLayers[1].width).toBe(2)
  expect(mappoMap.tileLayers[1].height).toBe(3)
  expect(mappoMap.tileLayers[1].parallax).toEqual({x: mul/div, y: mul/div})
}

{
  // can create from v2 map
  const layerCount = 3
  const width = 2
  const height = 3
  const v2layerinfo = makeBuffer([
      B.u8([1, 1, 1, 1]),
      B.u16(width),
      B.u16(height),
      B.u32(0),
  ])
  const buffer = makeBuffer([
    B.u8(filler(6)),
    B.u32(1),
    B.stringFixed(60, `HAHN01.VSP`),
    B.stringFixed(60, `music`),
    B.stringFixed(20, `13er2`),
    B.u16([2, 3]), // xstart/ystart
    B.u8(filler(51, 4)),
    B.u8(layerCount), // layerCount
    makeBuffer(filler(3, v2layerinfo)),
    B.compressedU16(filler(width * height, 77)),
    B.compressedU16(filler(width * height, 88)),
    B.compressedU16(filler(width * height, 99)),
    B.compressedU8(filler(width * height, 66)),
    B.compressedU8(filler(width * height, 55)),
    B.u32(1), // zoneCount
    B.stringFixed(40, `zone`),
    B.u16(filler(5, 6)),
    B.u8(1), // nmchr
    B.stringFixed(60, `chr`),
    B.u8(1), // entities
    B.u8(filler(80)),
    B.stringFixed(20, `the entity`),
    B.u8(1), // movementScriptCount
    B.u32(0), // msofstbl
    B.u32(0), // # things
    B.u32(1), // map events
    B.u32(0), // mapvctbl
    B.u32(1), // codesize
    B.u8(0), // mapvc
  ])

  const v2map = asset.fromBuffer(buffer, asset.v2map)
  const mappoMap = createMappoMap({
    map: v2map
  })

  expect(mappoMap.tilesetFilename).toBe(`HAHN01.VSP`)
  expect(mappoMap.tileLayers.length).toBe(layerCount)
  expect(mappoMap.mapLayerOrder).toEqual([0, 2, 1])

  expect(mappoMap.tileLayers[0].width).toBe(width)
  expect(mappoMap.tileLayers[0].height).toBe(height)
  expect(mappoMap.tileLayers[0].description).toBe(`Layer #0`)
  expect(mappoMap.tileLayers[0].tileIndexGrid).toEqual(filler(width * height, 77))
  expect(mappoMap.tileLayers[0].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[1].width).toBe(width)
  expect(mappoMap.tileLayers[1].height).toBe(height)
  expect(mappoMap.tileLayers[1].description).toBe(`Layer #1`)
  expect(mappoMap.tileLayers[1].tileIndexGrid).toEqual(filler(width * height, 88))
  expect(mappoMap.tileLayers[1].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[2].width).toBe(width)
  expect(mappoMap.tileLayers[2].height).toBe(height)
  expect(mappoMap.tileLayers[2].description).toBe(`Layer #2`)
  expect(mappoMap.tileLayers[2].tileIndexGrid).toEqual(filler(width * height, 99))
  expect(mappoMap.tileLayers[2].parallax).toEqual({x: 1.0, y: 1.0})
}

{
  // can create from v2.7 (ika) maps
  const numLayers = 2
  const width = 2
  const height = 3
  const v27layerinfo = makeBuffer([
    B.u32([1, 1, 1, 1]),
  ])
  const v27zone = makeBuffer([
    B.stringLengthEncoded(`zone: name`),
    B.stringLengthEncoded(`zone: description`),
    B.stringLengthEncoded(`zone: action script`),
    B.stringLengthEncoded(`zone: entity action script`),
    B.u32([0, 0]), // action chance, action delay
    B.u8(0), // adjacent activation
  ])
  const v27entity = makeBuffer([
    B.stringLengthEncoded(`entity: name`),
    B.u32([0, 0, 0, 0]), // x, y, direction, speed
    B.u8([0, 0, 0]), // obs map, obs ent, is obs
    B.stringLengthEncoded(`entity: chr filename`),
    B.u8(0), // adj act
    B.stringLengthEncoded(`entity: action script`),
    B.u32(0), // state
    B.stringLengthEncoded(`entity: move script`),
    B.u32([0, 0, 0, 0, 0, 0]), // wander: steps, delay, left, top, right, bot
    B.stringLengthEncoded(`entity: zone`),
    B.stringLengthEncoded(`entity: chase target`),
    B.u32(0), // chase distance
  ])
  const buffer = makeBuffer([
    B.u8(filler(6)),
    B.stringLengthEncoded(`HAHN01.VSP`),
    B.stringLengthEncoded(`music`),
    B.stringLengthEncoded(`1er2`),
    B.u32([width, height, 0, 0]), // startX, startY
    B.u8(0), // wrap
    B.u32(numLayers),
    makeBuffer(filler(numLayers, v27layerinfo)),
    B.ikaZlibU32(filler(width * height, 77)),
    B.ikaZlibU32(filler(width * height, 88)),
    B.ikaZlibU8(filler(width * height)),
    B.ikaZlibU32(filler(width * height)),
    B.u32(1), // numZones
    v27zone,
    B.u32(1), // numEntities
    v27entity,
  ])

  const v27map = asset.fromBuffer(buffer, asset.v27map)
  const mappoMap = createMappoMap({
    map: v27map
  })

  expect(mappoMap.tilesetFilename).toBe(`HAHN01.VSP`)
  expect(mappoMap.tileLayers.length).toBe(numLayers)
  expect(mappoMap.mapLayerOrder).toEqual([0, 1])

  expect(mappoMap.tileLayers[0].width).toBe(width)
  expect(mappoMap.tileLayers[0].height).toBe(height)
  expect(mappoMap.tileLayers[0].description).toBe(`Layer #0`)
  expect(mappoMap.tileLayers[0].tileIndexGrid).toEqual(filler(width * height, 77))
  expect(mappoMap.tileLayers[0].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[1].width).toBe(width)
  expect(mappoMap.tileLayers[1].height).toBe(height)
  expect(mappoMap.tileLayers[1].description).toBe(`Layer #1`)
  expect(mappoMap.tileLayers[1].tileIndexGrid).toEqual(filler(width * height, 88))
  expect(mappoMap.tileLayers[1].parallax).toEqual({x: 1.0, y: 1.0})
}

{
  // can create from v3 maps
  const v3layerinfo = (name, fillWith) => (
    makeBuffer([
      B.stringFixed(256, name),
      B.f64([1, 1]),
      B.u16([width, height]),
      B.u8(0),
      B.zlibU16(filler(width * height, fillWith)),
    ])
  )

  const layerCount = 3
  const width = 2
  const height = 3
  const buffer = makeBuffer([
    B.stringFixed(6, `V3MAP\0`),
    B.u32(0),
    B.u32(0),
    B.stringFixed(256, `map name`),
    B.stringFixed(256, `grue0040.vsp`),
    B.stringFixed(256, `music name`),
    B.stringFixed(256, `3,E,2,R,1`),
    B.stringFixed(256, `startup script`),
    B.u16([0, 0]), // startX,startY
    B.u32(layerCount),
    v3layerinfo(`Back`, 77),
    v3layerinfo(`Fore`, 88),
    v3layerinfo(`Clouds`, 99),
    B.zlibU8(filler(width * height, 88)),
    B.zlibU16(filler(width * height, 77)),
    B.u32(1), // # zones
    B.stringFixed(256, `zone name`),
    B.stringFixed(256, `zone script`),
    B.u8([0, 1, 2]),
    B.u32(1), // # entities
    B.u8(filler(26)),
    B.stringFixed(256, `entity move script`),
    B.stringFixed(256, `entity chr`),
    B.stringFixed(256, `entity description`),
    B.stringFixed(256, `entity script`),
    B.u8(0), // script bytes (all remaining)
  ])

  const v3map = asset.fromBuffer(buffer, asset.v3map)
  const mappoMap = createMappoMap({map: v3map})

  expect(mappoMap.tilesetFilename).toBe(`grue0040.vsp`)
  expect(mappoMap.tileLayers.length).toBe(layerCount)
  expect(mappoMap.mapLayerOrder).toEqual([2, 1, 0])

  expect(mappoMap.tileLayers[0].width).toBe(width)
  expect(mappoMap.tileLayers[0].height).toBe(height)
  expect(mappoMap.tileLayers[0].description).toBe(`Back`)
  expect(mappoMap.tileLayers[0].tileIndexGrid).toEqual(filler(width * height, 77))
  expect(mappoMap.tileLayers[0].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[1].width).toBe(width)
  expect(mappoMap.tileLayers[1].height).toBe(height)
  expect(mappoMap.tileLayers[1].description).toBe(`Fore`)
  expect(mappoMap.tileLayers[1].tileIndexGrid).toEqual(filler(width * height, 88))
  expect(mappoMap.tileLayers[1].parallax).toEqual({x: 1.0, y: 1.0})

  expect(mappoMap.tileLayers[2].width).toBe(width)
  expect(mappoMap.tileLayers[2].height).toBe(height)
  expect(mappoMap.tileLayers[2].description).toBe(`Clouds`)
  expect(mappoMap.tileLayers[2].tileIndexGrid).toEqual(filler(width * height, 99))
  expect(mappoMap.tileLayers[2].parallax).toEqual({x: 1.0, y: 1.0})
}