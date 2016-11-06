"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

module.exports = {
  version: T.u16,
  bytesPerPixel: T.u8,
  tileWidth: T.u16,
  tileHeight: T.u16,
  tileCount: T.u32,
  description: T.stringFixed(64),
  palette: T.list(T.u8, 3 * 256),
  transparentIndex: T.u8,
  imageData: T.ikaZlibU8(({record}) => (
    record.tileWidth * record.tileHeight * record.tileCount
  )),
  animations: T.list(V1_VSPANIM, 100),
}
