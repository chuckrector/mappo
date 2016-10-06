"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  numtiles: T.u8,
  itemicons: ({record}) => 16 * 16 * record.numtiles
}
