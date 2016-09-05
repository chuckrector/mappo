"use strict"

const expect = require('expect')
const createVerge1TransTblLoader = require('./createVerge1TransTblLoader')
const fill = require('lodash/fill')

const transparencytbl = fill(Array(256 * 256), 99)

{
  // can read TRANS.TBL
  const loader = createVerge1TransTblLoader({
    data: Buffer.from(transparencytbl)
  })

  const data = loader.load()

  expect(data.transparencytbl).toEqual(transparencytbl)
}
