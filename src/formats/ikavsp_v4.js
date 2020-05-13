"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

// 16bpp uncompressed
module.exports = {
  version: T.u16,
  tileCount: T.u16,
  tiles: T.list(T.u16, ({record}) => record.tileCount * 16 * 16),
  va0: T.list(V1_VSPANIM, 100)
}
