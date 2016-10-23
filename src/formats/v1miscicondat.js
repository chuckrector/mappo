"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  tileCount: T.u8,
  menuPointer: T.list(T.u8, 16 * 16),
  itmptr: T.list(T.u8, 24 * 24),
  charptr: T.list(T.u8, 24 * 40),
}
