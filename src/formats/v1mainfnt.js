"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  fnt2: T.list(T.u8, 9 * 16 * 95)
}