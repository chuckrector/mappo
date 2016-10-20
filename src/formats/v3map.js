"use strict"

const {T} = require(`../readFormat`)
const V3_LAYERINFO = require(`./v3layerinfo`)
const V3_ZONE = require(`./v3zone`)
const V3_ENTITY = require(`./v3entity`)

module.exports = {
  signature: T.stringFixed(6),
  version: T.u32,
  scriptOffset: T.u32,
  description: T.stringFixed(256),
  vspFilename: T.stringFixed(256),
  musicFilename: T.stringFixed(256),
  renderString: T.stringFixed(256),
  startupScript: T.stringFixed(256),
  startX: T.u16,
  startY: T.u16,
  layerCount: T.u32,
  layers: T.list(V3_LAYERINFO, ({record}) => record.layerCount),
  obstructionLayer: T.zlibU8(({record}) => record.layers[0].width * record.layers[0].height),
  zoneLayer: T.zlibU16(({record}) => record.layers[0].width * record.layers[0].height),
  zoneCount: T.u32,
  zones: T.list(V3_ZONE, ({record}) => record.zoneCount),
  entityCount: T.u32,
  entities: T.list(V3_ENTITY, ({record}) => record.entityCount),
  // scriptsize: T.u32, // lua stuff? seems to get huge-normous values
  script: T.list(T.u8, ({reader}) => reader.remaining),//record.scriptsize),
}
