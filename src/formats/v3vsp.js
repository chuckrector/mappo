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
  animationCount: T.u32,
  animations: T.list(V3_VSPANIM, ({record}) => record.animationCount),
  obstructionCount: T.u32,
  obstructions: T.zlibU8(({record}) => record.tilesize * record.tilesize * record.obstructionCount),
}
