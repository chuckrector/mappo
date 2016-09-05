"use strict"

const expect = require('expect')
const createVerge1ChrLoader = require('./createVerge1ChrLoader')
const fill = require('lodash/fill')

const chrs = fill(Array(16 * 32 * 30), 99)

{
  // can read chrs
  const loader = createVerge1ChrLoader({
    data: Buffer.from(chrs)
  })

  const data = loader.load()

  expect(data.chrs).toEqual(chrs)
}