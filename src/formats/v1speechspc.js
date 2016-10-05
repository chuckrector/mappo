"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  numtiles: T.u8,
  speech: T.list(T.u8, ({o}) => 32 * 32 * o.numtiles)
}