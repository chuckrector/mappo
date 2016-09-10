"use strict"

const {T} = require('../readFormat')

module.exports = {
  numtiles: T.u8,
  speech: T.list(T.u8, ({record}) => 32 * 32 * record.numtiles)
}