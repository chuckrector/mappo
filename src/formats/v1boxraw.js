"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  transparentBox: T.list(T.u8, 320 * 66)
}