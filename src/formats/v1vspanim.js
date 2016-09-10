"use strict"

const {T} = require('../readFormat')

module.exports = {
  start: T.u16,
  finish: T.u16,
  delay: T.u16,
  mode: T.u16,
}
