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
  tiledatabuf: T.zlibU8(({o}) => o.tilesize * o.tilesize * 3 * o.numtiles),
  numanims: T.u32,
  anims: T.list(V3_VSPANIM, ({o}) => o.numanims),
  numobs: T.u32,
  obs: T.zlibU8(({o}) => o.tilesize * o.tilesize * o.numobs),
}
