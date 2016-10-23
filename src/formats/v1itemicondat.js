"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  tileCount: T.u8,
  itemicons: ({record}) => 16 * 16 * record.tileCount
}
