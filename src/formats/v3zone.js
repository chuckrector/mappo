"use strict"

const {T} = require('../readFormat')

module.exports = {
  name: T.stringFixed(256),
  script: T.stringFixed(256),
  percent: T.u8,
  delay: T.u8,
  method: T.u8,
}
