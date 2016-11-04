"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  length: T.u32,
  animationString: T.stringNullTerminated,
}
