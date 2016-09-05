"use strict"

const expect = require('expect')
const createVerge1VspLoader = require('./createVerge1VspLoader')
const fill = require('lodash/fill')

const vspAnim = Buffer.concat([
  // start, finish, delay, mode
  Buffer.from(new Uint16Array([4, 3, 2, 1]).buffer),
])

const vsp = Buffer.concat([
  // version
  Buffer.from(new Uint16Array([2]).buffer),
  // palette
  Buffer.from(fill(Array(256 * 3), 77)),
  // numtiles
  Buffer.from(new Uint16Array([3]).buffer),
  // tile image data
  Buffer.from(fill(Array(3 * 16 * 16), 66)),
  Buffer.concat(fill(Array(100), vspAnim)),
])

{
  // can read header
  const loader = createVerge1VspLoader({
    data: vsp
  })

  const data = loader.load()

  expect(data.version).toBe(2)
  expect(data.palette).toEqual(fill(Array(256 * 3), 77))
}

{
  // can read tiles
  const loader = createVerge1VspLoader({
    data: vsp
  })

  const data = loader.load()

  expect(data.numtiles).toBe(3)
  expect(data.vsp0).toEqual(fill(Array(data.numtiles * 16 * 16), 66))
}

{
  // can read tile animations
  const loader = createVerge1VspLoader({
    data: vsp
  })

  const data = loader.load()

  expect(data.va0).toEqual(fill(Array(100), {
    start: 4,
    finish: 3,
    delay: 2,
    mode: 1,
  }))
}