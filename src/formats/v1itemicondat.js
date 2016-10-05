"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  numtiles: T.u8,
  itemicons: ({o}) => 16 * 16 * o.numtiles
}
