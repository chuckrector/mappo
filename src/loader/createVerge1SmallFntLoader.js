"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  return {
    load: () => readFormat({
      format: {fnt: T.list(T.u8, 7 * 9 * 95)},
      reader
    })
  }
}