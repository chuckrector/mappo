"use strict"

const {T} = require(`../readFormat`)

module.exports = {
  version: T.u8,
  frameWidth: T.u16,
  frameHeight: T.u16,
  hotSpotX: T.u16,
  hotSpotY: T.u16,
  hotSpotWidth: T.u16,
  hotSpotHeight: T.u16,
  leftIdleFrameIndex: T.u16,
  rightIdleFrameIndex: T.u16,
  upIdleFrameIndex: T.u16,
  downIdleFrameIndex: T.u16,
  frameCount: T.u16,
  lanimLength: T.u32,
  lanim: T.stringFixed(({record}) => record.lanimLength),
  ranimLength: T.u32,
  ranim: T.stringFixed(({record}) => record.ranimLength),
  uanimLength: T.u32,
  uanim: T.stringFixed(({record}) => record.uanimLength),
  danimLength: T.u32,
  danim: T.stringFixed(({record}) => record.danimLength),
  frames: T.compressedU16(({record}) => record.frameWidth * record.frameHeight * record.frameCount),
}
