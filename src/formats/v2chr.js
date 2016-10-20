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
  frameCount: T.u16,
  frames: T.compressedU8(({record}) => record.frameWidth * record.frameHeight * record.frameCount),
  leftIdleFrameIndex: T.u32,
  rightIdleFrameIndex: T.u32,
  upIdleFrameIndex: T.u32,
  downIdleFrameIndex: T.u32,
  lanimLength: T.u32,
  lanim: T.stringFixed(({record}) => record.lanimLength),
  ranimLength: T.u32,
  ranim: T.stringFixed(({record}) => record.ranimLength),
  uanimLength: T.u32,
  uanim: T.stringFixed(({record}) => record.uanimLength),
  danimLength: T.u32,
  danim: T.stringFixed(({record}) => record.danimLength),
}
