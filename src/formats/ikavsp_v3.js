"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

// 8bpp RLE compressed VSP
module.exports = {
  version: T.u16,
  palette: T.list(T.u8, 256 * 3),
  tileCount: T.u16,
  tileBufferSize: T.u32,
  tiles: T.list(T.u8, ({record}) => record.tileBufferSize),
  va0: T.list(V1_VSPANIM, 100)
}
