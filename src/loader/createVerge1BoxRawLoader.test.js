"use strict"

const expect = require('expect')
const createVerge1BoxRawLoader = require('./createVerge1BoxRawLoader')
const fill = require('lodash/fill')

const tileWidth = 320
const tileHeight = 66
const tbox = fill(Array(tileWidth * tileHeight), 99)

{
  // can read font
  const loader = createVerge1BoxRawLoader({
    data: Buffer.from(tbox)
  })

  const data = loader.load()

  expect(data.tbox).toEqual(tbox)
}
