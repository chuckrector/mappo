"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  tileCount: T.u8,
  tiles: ({record}) => 16 * 16 * record.tileCount
}
