"use strict"

const {T} = require(`../readFormat`)
const V3_VSPANIM = require(`./v3vspanim`)

module.exports = {
  signature: T.u32,
  version: T.u32,
  tilesize: T.u32,
  format: T.u32,
  numtiles: T.u32,
  compression: T.u32,
  tiledatabuf: T.zlibU8(({record}) => record.tilesize * record.tilesize * 3 * record.numtiles),
  numanims: T.u32,
  anims: T.list(V3_VSPANIM, ({record}) => record.numanims),
  numobs: T.u32,
  obs: T.zlibU8(({record}) => record.tilesize * record.tilesize * record.numobs),
}
