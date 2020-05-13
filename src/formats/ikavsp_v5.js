"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

// 16bpp RLE compressed
module.exports = {
  version: T.u16,
  tileCount: T.u16,
  tileBufferSize: T.u32,
  tiles: T.list(T.u16, ({record}) => record.tileBufferSize),
  va0: T.list(V1_VSPANIM, 100)
}
