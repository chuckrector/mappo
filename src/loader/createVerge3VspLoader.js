"use strict"

const createDataReader = require('../createDataReader')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V2_VSPANIM = {
    name: T.stringFixed(256),
    start: T.u32,
    finish: T.u32,
    delay: T.u32,
    mode: T.u32,
  }

  const V2_VSP = {
    signature: T.u32,
    version: T.u32,
    tilesize: T.u32,
    format: T.u32,
    numtiles: T.u32,
    compression: T.u32,
    tiledatabuf: T.zlib(({record}) => record.tilesize * record.tilesize * 3 * record.numtiles),
    numanims: T.u32,
    anims: T.list(V2_VSPANIM, ({record}) => record.numanims),
    numobs: T.u32,
    obs: T.zlib(({record}) => record.tilesize * record.tilesize * record.numobs),
  }

  return {
    load: () => readFormat({format: V2_VSP, reader})
  }
}