"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  pal: T.list(T.u8, 256 * 3)
}
