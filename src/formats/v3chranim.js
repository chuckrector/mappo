"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  length: T.u32,
  animbuf: T.stringNullTerminated,
}
