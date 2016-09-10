"use strict"

const {T} = require('../readFormat')

module.exports = {
  zonename: T.stringFixed(15),
  zonenamePadding: T.u8,
  callevent: T.u16,
  percent: T.u8,
  delay: T.u8,
  aaa: T.u8,
  savedesc: T.stringFixed(30),
  savedescPadding: T.u8,
}