"use strict"

const expect = require('expect')
const createVerge1ItemIconDatLoader = require('./createVerge1ItemIconDatLoader')
const fill = require('lodash/fill')
const {makeBuffer, B} = require('../makeBuffer')

const tileWidth = 16
const tileHeight = 16
const numtiles = 21
const itemicons = fill(Array(tileWidth * tileHeight * numtiles), 99)

{
  // can read ITEMICON.DAT
  const loader = createVerge1ItemIconDatLoader({
    data: makeBuffer([
      B.u8(21),
      B.list(B.u8, itemicons)
    ])
  })

  const data = loader.load()

  expect(data.numtiles).toEqual(numtiles)
  expect(data.itemicons).toEqual(itemicons)
}