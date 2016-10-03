"use strict"

const {T} = require(`../readFormat`)
const V1_VSPANIM = require(`./v1vspanim`)

module.exports = {
  version: T.u16,
  bytesPerPixel: T.u8,
  tileWidth: T.u16,
  tileHeight: T.u16,
  numTiles: T.u32,
  description: T.stringFixed(64),
  imageData: T.ikaZlibU8(({record}) => (
    record.tileWidth * record.tileHeight * record.numTiles * record.bytesPerPixel
  )),
  animations: T.list(V1_VSPANIM, 100),
}
