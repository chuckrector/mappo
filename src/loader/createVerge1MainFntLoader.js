"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  return {
    load: () => readFormat({
      format: {fnt2: T.list(T.u8, 9 * 16 * 95)},
      reader
    })
  }
}