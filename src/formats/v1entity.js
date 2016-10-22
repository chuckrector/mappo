"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  x: T.u16,
  y: T.u16,
  facing: T.u8,
  moving: T.u8,
  movementCounter: T.u8,
  frameCounter: T.u8,
  specialFrame: T.u8,
  characterIndex: T.u8,
  movementPatternCode: T.u8,
  canBeActivated: T.u8,
  cannotBeObstructed: T.u8,
  padding: T.list(T.u8, 3),
  activationScript: T.u32,
  movementScript: T.u32,
  speed: T.u8,
  speedCounter: T.u8,
  step: T.u16,
  delay: T.u16,
  data1: T.u16,
  data2: T.u16,
  data3: T.u16,
  data4: T.u16,
  delayCounter: T.u16,
  wasActivated: T.u16,
  boundingBox: {
    x1: T.u16,
    y1: T.u16,
    x2: T.u16,
    y2: T.u16,
  },
  currentCommandCode: T.u8,
  currentCommandArgument: T.u8,
  scriptParsingOffset: T.u32,
  face: T.u8,
  chasing: T.u8,
  chaseSpeed: T.u8,
  chaseDistance: T.u8,
  currentTileX: T.u16,
  currentTileY: T.u16,
  futureExpansion: T.u32,
  description: T.stringFixed(20),
}