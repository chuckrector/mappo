"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

module.exports = {
  version: T.u16,
  palette: T.list(T.u8, 256 * 3),
  numtiles: T.u16,
  vsp0: T.list(T.u8, ({record}) => record.numtiles * 16 * 16),
  va0: T.list(V1_VSPANIM, 100),
}
