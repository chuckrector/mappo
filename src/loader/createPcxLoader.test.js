"use strict"

const expect = require(`expect`)
const createPcxLoader = require(`./createPcxLoader`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)
const {makeBuffer, B} = require(`../makeBuffer`)

const tileWidth = 4
const tileHeight = 4
const pcx = filler(tileWidth * tileHeight, 99)

const manufacturer = 1
const version = 2
const encoding = 3
const bitsPerPixel = 8
const xmin = 0
const ymin = 0
const xmax = tileWidth - 1
const ymax = tileHeight - 1
const hres = tileWidth
const vres = tileHeight
const egaPalette = filler(48, 99)
const reserved = 4
const colorPlanes = 5
const bytesPerLine = 4
const paletteType = 7
const fill = filler(58, 88)

{
  // can read PCX
  const loader = createPcxLoader({
    data: makeBuffer([
      B.u8([manufacturer, version, encoding, bitsPerPixel]),
      B.u16([xmin, ymin, xmax, ymax, hres, vres]),
      B.u8(egaPalette),
      B.u8([reserved, colorPlanes]),
      B.u16([bytesPerLine, paletteType]),
      B.u8(fill),
      B.u8([0xc0 | 4, 99, 0xc0 | 4, 99, 0xc0 | 4, 99, 0xc0 | 4, 99]),
      B.u8(palette),
    ])
  })

  const data = loader.load()

  expect(data.width).toEqual(tileWidth)
  expect(data.height).toEqual(tileHeight)
  expect(data.raw8bitData).toEqual(pcx)
  expect(data.palette).toEqual(palette)
}