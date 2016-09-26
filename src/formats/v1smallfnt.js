"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  fnt: T.list(T.u8, 7 * 9 * 95)
}

