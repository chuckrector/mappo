"use strict"

const expect = require('expect')
const createPcxLoader = require('./createPcxLoader')
const fill = require('lodash/fill')
const palette = require('./dummyPalette')

const tileWidth = 4
const tileHeight = 4
const pcx = fill(Array(tileWidth * tileHeight), 99)

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
const egaPalette = fill(Array(48), 99)
const reserved = 4
const colorPlanes = 5
const bytesPerLine = 4
const paletteType = 7
const filler = fill(Array(58), 88)

{
  // can read PCX
  const loader = createPcxLoader({
    data: Buffer.concat([
      Buffer.from([manufacturer, version, encoding, bitsPerPixel]),
      Buffer.from(new Uint16Array([xmin, ymin, xmax, ymax, hres, vres]).buffer),
      Buffer.from(egaPalette),
      Buffer.from([reserved, colorPlanes]),
      Buffer.from(new Uint16Array([bytesPerLine, paletteType]).buffer),
      Buffer.from(filler),
      Buffer.from([0xc0 | 4, 99, 0xc0 | 4, 99, 0xc0 | 4, 99, 0xc0 | 4, 99])
    ])
  })

  const data = loader.load()

  expect(data.width).toEqual(tileWidth)
  expect(data.height).toEqual(tileHeight)
  expect(data.raw8bitData).toEqual(pcx)
}