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
  totalframes: T.u16,
  imagedata: T.compressedU8(({o}) => o.fxsize * o.fysize * o.totalframes),
  lidle: T.u32,
  ridle: T.u32,
  uidle: T.u32,
  didle: T.u32,
  lanimLength: T.u32,
  lanim: T.stringFixed(({o}) => o.lanimLength),
  ranimLength: T.u32,
  ranim: T.stringFixed(({o}) => o.ranimLength),
  uanimLength: T.u32,
  uanim: T.stringFixed(({o}) => o.uanimLength),
  danimLength: T.u32,
  danim: T.stringFixed(({o}) => o.danimLength),
}
