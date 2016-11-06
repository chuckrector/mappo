"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  worldPixelX: T.u32,
  worldPixelY: T.u32,
  tileX: T.u16,
  tileY: T.u16,
  facing: T.u8,
  moving: T.u8,
  movementCounter: T.u8,
  frame: T.u8,
  specialFrame: T.u8,
  characterIndex: T.u8,
  reset: T.u8,
  canBeObstructed: T.u8,
  isAnObstruction: T.u8,
  speed: T.u8,
  speedCounter: T.u8,
  delayCounter: T.u8,
  animationOffset: T.u32,
  scriptParsingOffset: T.u32,
  face: T.u8,
  activationMode: T.u8,
  movementPatternCode: T.u8,
  movementScript: T.u8,
  ctr: T.u8,
  mode: T.u8,
  modePadding: T.list(T.u8, 2),
  step: T.u16,
  delay: T.u16,
  stepCounter: T.u16,
  delayCounter: T.u16,
  data1: T.u16,
  data2: T.u16,
  data3: T.u16,
  data4: T.u16,
  data5: T.u16,
  data6: T.u16,
  activationScript: T.u32,
  futureExpansion1: T.u32,
  futureExpansion2: T.u32,
  futureExpansion3: T.u32,
  futureExpansion4: T.u32,
  description: T.stringFixed(20),
}
