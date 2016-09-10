"use strict"

const expect = require('expect')
const createVerge3VspObConverter = require('./createVerge3VspObConverter')
const fill = require('lodash/fill')
const colorDepth = require('./colorDepth')
const palette = require('../dummyPalette')

{
  // can convert vsp obstruction tile data to png
  const converter = createVerge3VspObConverter({
    palette,
    numobs: 21,
    obs: fill(Array(16 * 16 * 3 * 12)),
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(16 * 20)
  expect(png.height).toBe(16 * 2)
}