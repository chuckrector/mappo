"use strict"

const expect = require('expect')
const createVerge1TransTblConverter = require('./createVerge1TransTblConverter')
const fill = require('lodash/fill')

{
  // can convert TRANS.TBL to JSON
  const transparencytbl = fill(Array(256 * 256), 99)
  const converter = createVerge1TransTblConverter({
    transparencytbl
  })

  const json = converter.convertToJson()
  const js = JSON.parse(json)

  expect(js).toEqual({transparencytbl})
}