"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V3_CHRANIM = {
    length: T.u32, // effectively ignored
    animbuf: T.stringNullTerminated,
  }

  const V3_CHR = {
    signature: T.u32,
    version: T.u32,
    bpp: T.u32,
    flags: T.u32,
    tcol: T.u32,
    hx: T.u32,
    hy: T.u32,
    hw: T.u32,
    hh: T.u32,
    fxsize: T.u32,
    fysize: T.u32,
    totalframes: T.u32,
    didle: T.u32,
    uidle: T.u32,
    lidle: T.u32,
    ridle: T.u32,
    anims: T.list(V3_CHRANIM, 8),
    customscripts: T.u32,
    compression: T.u32,
    imagedata: T.zlib(({record}) => {
      return record.totalframes * record.fxsize * record.fysize * (record.bpp / 8)
    }),
  }

  return {
    load: () => readFormat({format: V3_CHR, reader})
  }
}