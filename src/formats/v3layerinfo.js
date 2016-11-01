"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  description: T.stringFixed(256),
  parallax: {
    x: T.f64,
    y: T.f64,
  },
  width: T.u16,
  height: T.u16,
  lucent: T.u8,
  tileData: T.zlibU16(({record}) => record.width * record.height),
}
