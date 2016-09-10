"use strict"

const {T} = require('../readFormat')

module.exports = {
  chrs: T.list(T.u8, 16 * 32 * 30)
}