"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  version: T.u8,
  frameWidth: T.u16,
  frameHeight: T.u16,
  hx: T.u16,
  hy: T.u16,
  hw: T.u16,
  hh: T.u16,
  totalframes: T.u16,
  imagedata: T.compressedU8(({record}) => record.frameWidth * record.frameHeight * record.totalframes),
  lidle: T.u32,
  ridle: T.u32,
  uidle: T.u32,
  didle: T.u32,
  lanimLength: T.u32,
  lanim: T.stringFixed(({record}) => record.lanimLength),
  ranimLength: T.u32,
  ranim: T.stringFixed(({record}) => record.ranimLength),
  uanimLength: T.u32,
  uanim: T.stringFixed(({record}) => record.uanimLength),
  danimLength: T.u32,
  danim: T.stringFixed(({record}) => record.danimLength),
}
