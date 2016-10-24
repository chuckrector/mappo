"use strict"

const {T} = require(`../readFormat`)
const V3_VSPANIM = require(`./v3vspanim`)

module.exports = {
  signature: T.u32,
  version: T.u32,
  tileSize: T.u32,
  format: T.u32,
  tileCount: T.u32,
  compression: T.u32,
  tiledatabuf: T.zlibU8(({record}) => record.tileSize * record.tileSize * 3 * record.tileCount),
  animationCount: T.u32,
  animations: T.list(V3_VSPANIM, ({record}) => record.animationCount),
  obstructionCount: T.u32,
  obstructions: T.zlibU8(({record}) => record.tileSize * record.tileSize * record.obstructionCount),
}
