"use strict"

const {T} = require('../readFormat')

module.exports = {
  transparencytbl: T.list(T.u8, 256 * 256)
}