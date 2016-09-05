"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V2_VSPANIM = {
    start: T.u16,
    finish: T.u16,
    delay: T.u16,
    mode: T.u16,
  }

  const V2_VSP = {
    version: T.u16,
    palette: T.list(T.u8, 16 * 16 * 3),
    numtiles: T.u16,
    imagedata: T.compressedU8(({record}) => record.numtiles * 16 * 16),
    vspanim: T.list(V2_VSPANIM, 100),
  }

  return {
    load: () => readFormat({format: V2_VSP, reader})
  }
}