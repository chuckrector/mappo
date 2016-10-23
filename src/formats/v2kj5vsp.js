"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

module.exports = {
  version: T.u16,
  palette: T.list(T.u8, 3 * 256),
  tileCount: T.u16,
  frames: T.compressedU16(({record}) => 16 * 16 * record.tileCount),
  vspanim: T.list(V1_VSPANIM, 100),
}
