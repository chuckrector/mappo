"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  layername: T.stringFixed(256),
  parallax_x: T.f64,
  parallax_y: T.f64,
  width: T.u16,
  height: T.u16,
  lucent: T.u8,
  tiledata: T.zlibU16(({record}) => record.width * record.height),
}
