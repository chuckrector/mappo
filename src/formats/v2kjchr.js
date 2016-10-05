"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  version: T.u8,
  fxsize: T.u16,
  fysize: T.u16,
  hx: T.u16,
  hy: T.u16,
  hw: T.u16,
  hh: T.u16,
  lidle: T.u16,
  ridle: T.u16,
  uidle: T.u16,
  didle: T.u16,
  totalframes: T.u16,
  lanimLength: T.u32,
  lanim: T.stringFixed(({o}) => o.lanimLength),
  ranimLength: T.u32,
  ranim: T.stringFixed(({o}) => o.ranimLength),
  uanimLength: T.u32,
  uanim: T.stringFixed(({o}) => o.uanimLength),
  danimLength: T.u32,
  danim: T.stringFixed(({o}) => o.danimLength),
  imagedata: T.compressedU16(({o}) => o.fxsize * o.fysize * o.totalframes),
}
