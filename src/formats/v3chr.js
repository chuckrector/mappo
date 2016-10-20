"use strict"

const {T} = require(`../readFormat`)
const V3_CHRANIM = require(`./v3chranim`)

module.exports = {
  signature: T.u32,
  version: T.u32,
  bpp: T.u32,
  flags: T.u32,
  transparentColor: T.u32,
  hotSpotX: T.u32,
  hotSpotY: T.u32,
  hotSpotWidth: T.u32,
  hotSpotHeight: T.u32,
  frameWidth: T.u32,
  frameHeight: T.u32,
  frameCount: T.u32,
  downIdleFrameIndex: T.u32,
  upIdleFrameIndex: T.u32,
  leftIdleFrameIndex: T.u32,
  rightIdleFrameIndex: T.u32,
  animations: T.list(V3_CHRANIM, 8),
  customscripts: T.u32,
  compression: T.u32,
  frames: T.zlibU8(({record}) => {
    return record.frameCount * record.frameWidth * record.frameHeight * (record.bpp / 8)
  }),
}
