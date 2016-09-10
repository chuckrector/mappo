"use strict"

const {T} = require('../readFormat')

module.exports = {
  name: T.stringFixed(256),
  start: T.u32,
  finish: T.u32,
  delay: T.u32,
  mode: T.u32,
}
