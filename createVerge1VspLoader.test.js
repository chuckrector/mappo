"use strict"

const expect = require('expect')
const createVerge1VspLoader = require('./createVerge1VspLoader')

const vspHeader = Buffer.concat([
  Buffer.from(new Uint16Array([2]).buffer)
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
}