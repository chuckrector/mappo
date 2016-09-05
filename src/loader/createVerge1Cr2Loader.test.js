"use strict"

const expect = require('expect')
const createVerge1Cr2Loader = require('./createVerge1Cr2Loader')
const fill = require('lodash/fill')

const tileWidth = 96
const tileHeight = 96
const chr2 = fill(Array(tileWidth * tileHeight), 99)

{
  // can read CR2
  const loader = createVerge1Cr2Loader({
    data: Buffer.from(chr2)
  })

  const data = loader.load()

  expect(data.chr2).toEqual(chr2)
}