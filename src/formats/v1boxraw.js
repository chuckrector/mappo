"use strict"

const {T} = require('../readFormat')

module.exports = {
  tbox: T.list(T.u8, 320 * 66)
}