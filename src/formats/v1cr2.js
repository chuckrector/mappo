"use strict"

const {T} = require('../readFormat')

module.exports = {
  chr2: T.list(T.u8, 96 * 96)
}