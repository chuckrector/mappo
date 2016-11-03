"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  x1: T.u16,
  y1: T.u16,
  face: T.u8,
  obstructable: T.u8,
  obstruction: T.u8,
  autoface: T.u8,
  speed: T.u16,
  speedCounter: T.u8,
  delayCounter: T.u8,
  wander: {
    x1: T.u16,
    y1: T.u16,
    x2: T.u16,
    y2: T.u16,
    delay: T.u16,
  },
  maybeOffset: T.u32,
  movementScript: T.stringFixed(256),
  chrname: T.stringFixed(256),
  description: T.stringFixed(256),
  script: T.stringFixed(256),
}
