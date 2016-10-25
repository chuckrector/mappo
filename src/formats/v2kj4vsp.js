"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

module.exports = {
  version: T.u16,
  palette: T.list(T.u8, 3 * 256),
  tileCount: T.u16,
  frames: T.u16(({record}) => 16 * 16 * record.tileCount),
  animations: T.list(V1_VSPANIM, 100),
}
