"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  return {
    load: () => readFormat({
      format: {
        numtiles: T.u8,
        speech: T.list(T.u8, ({record}) => 32 * 32 * record.numtiles)
      },
      reader
    })
  }
}