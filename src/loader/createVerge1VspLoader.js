"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V1_VSPANIM = {
    start: T.u16,
    finish: T.u16,
    delay: T.u16,
    mode: T.u16,
  }

  const V1_VSP = {
    version: T.u16,
    palette: T.list(T.u8, 256 * 3),
    numtiles: T.u16,
    vsp0: T.list(T.u8, ({record}) => record.numtiles * 16 * 16),
    va0: T.list(V1_VSPANIM, 100),
  }

  return {
    load: () => readFormat({format: V1_VSP, reader})
  }
}