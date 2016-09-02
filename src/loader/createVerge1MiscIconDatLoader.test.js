"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1MiscIconDatLoader = require('./createVerge1MiscIconDatLoader')
const fill = require('lodash/fill')

const menuptrTileWidth = 16
const menuptrTileHeight = 16
const itmptrTileWidth = 24
const itmptrTileHeight = 24
const charptrTileWidth = 24
const charptrTileHeight = 40
const numtiles = 3
const menuptr = fill(Array(menuptrTileWidth * menuptrTileHeight), 77)
const itmptr = fill(Array(itmptrTileWidth * itmptrTileHeight), 88)
const charptr = fill(Array(charptrTileWidth * charptrTileHeight), 99)

{
  // can read SPEECH.SPC
  const loader = createVerge1MiscIconDatLoader({
    data: Buffer.concat([
      Buffer.from([numtiles]),
      Buffer.from(menuptr),
      Buffer.from(itmptr),
      Buffer.from(charptr),
    ])
  })

  const data = loader.load()

  expect(data.numtiles).toEqual(numtiles)
  expect(data.menuptr).toEqual(menuptr)
  expect(data.itmptr).toEqual(itmptr)
  expect(data.charptr).toEqual(charptr)
}