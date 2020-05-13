"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

// 16bpp RLE compressed
module.exports = {
  version: T.u16,
  bitsPerPixel: T.u8,
  tileWidth: T.u16,
  tileHeight: T.u16,
  tileCount: T.u32,
  description: T.stringFixed(64),

  // NOTE: 8bpp was supposedly never used.
  //palette: T.list(u8, 256 * 3),
  //maskColor: T.u8,

  tileBufferSize: T.u32,
  tiles: T.list(T.u16, ({record}) => record.tileBufferSize),
  va0: T.list(V1_VSPANIM, 100)
}
