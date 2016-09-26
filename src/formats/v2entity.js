"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  x: T.u32,
  y: T.u32,
  tx: T.u16,
  ty: T.u16,
  facing: T.u8,
  moving: T.u8,
  movcnt: T.u8,
  frame: T.u8,
  specframe: T.u8,
  chrindex: T.u8,
  reset: T.u8,
  obsmode1: T.u8,
  obsmode2: T.u8,
  speed: T.u8,
  speedct: T.u8,
  delayct: T.u8,
  animofs: T.u32,
  scriptofs: T.u32,
  face: T.u8,
  actm: T.u8,
  movecode: T.u8,
  movescript: T.u8,
  ctr: T.u8,
  mode: T.u8,
  modePadding: T.list(T.u8, 2),
  step: T.u16,
  delay: T.u16,
  stepctr: T.u16,
  delayctr: T.u16,
  data1: T.u16,
  data2: T.u16,
  data3: T.u16,
  data4: T.u16,
  data5: T.u16,
  data6: T.u16,
  actscript: T.u32,
  expand1: T.u32,
  expand2: T.u32,
  expand3: T.u32,
  expand4: T.u32,
  desc: T.stringFixed(20),
}
