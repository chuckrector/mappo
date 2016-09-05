"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  return {
    load: () => readFormat({
      format: {chr2: T.list(T.u8, 96 * 96)},
      reader
    })
  }
}