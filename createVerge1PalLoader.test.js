"use strict"

const expect = require('expect')
const createVerge1PalLoader = require('./createVerge1PalLoader')
const fill = require('lodash/fill')

const palette = fill(Array(256 * 3), 99)

{
  // can read palette
  const loader = createVerge1PalLoader({
    data: Buffer.from(palette)
  })

  const data = loader.load()

  expect(data.pal).toEqual(palette)
}