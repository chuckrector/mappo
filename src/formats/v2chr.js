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
  leftAnimationStringSize: T.u32,
  leftAnimationString: T.stringFixed(({record}) => record.leftAnimationStringSize),
  rightAnimationStringSize: T.u32,
  rightAnimationString: T.stringFixed(({record}) => record.rightAnimationStringSize),
  upAnimationStringSize: T.u32,
  upAnimationString: T.stringFixed(({record}) => record.upAnimationStringSize),
  downAnimationStringSize: T.u32,
  downAnimationString: T.stringFixed(({record}) => record.downAnimationStringSize),
}
