"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  x: T.u16,
  y: T.u16,
  facing: T.u8,
  moving: T.u8,
  movcnt: T.u8,
  framectr: T.u8,
  specframe: T.u8,
  chrindex: T.u8,
  movecode: T.u8,
  activmode: T.u8,
  obsmode: T.u8,
  padding: T.list(T.u8, 3),
  actscript: T.u32,
  movescript: T.u32,
  speed: T.u8,
  speedct: T.u8,
  step: T.u16,
  delay: T.u16,
  data1: T.u16,
  data2: T.u16,
  data3: T.u16,
  data4: T.u16,
  delayct: T.u16,
  adjactv: T.u16,
  x1: T.u16,
  y1: T.u16,
  x2: T.u16,
  y2: T.u16,
  curcmd: T.u8,
  cmdarg: T.u8,
  scriptofs: T.u32,
  face: T.u8,
  chasing: T.u8,
  chasespeed: T.u8,
  chasedist: T.u8,
  cx: T.u16,
  cy: T.u16,
  expand: T.u32,
  entitydesc: T.stringFixed(20),
}