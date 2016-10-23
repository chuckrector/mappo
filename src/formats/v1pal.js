"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  palette: T.list(T.u8, 256 * 3)
}
