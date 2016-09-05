"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V1_MISCICON_DAT = {
    numtiles: T.u8,
    menuptr: T.list(T.u8, 16 * 16),
    itmptr: T.list(T.u8, 24 * 24),
    charptr: T.list(T.u8, 24 * 40),
  }

  return {
    load: () => readFormat({format: V1_MISCICON_DAT, reader})
  }
}