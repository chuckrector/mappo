"use strict"

const expect = require('expect')
const createVerge1VspLoader = require('./createVerge1VspLoader')
const fill = require('lodash/fill')

const vspHeader = Buffer.concat([
  Buffer.from(new Uint16Array([2]).buffer),
  Buffer.from(fill(Array(256 * 3), 77)),
  Buffer.from(new Uint16Array([3]).buffer),
])

const vsp = Buffer.concat([
  vspHeader,
])

{
  // can read header
  const loader = createVerge1VspLoader({
    data: vsp
  })

  const data = loader.load()

  expect(data.version).toBe(2)
  expect(data.palette).toEqual(fill(Array(256 * 3), 77))
  expect(data.numtiles).toBe(3)
}