"use strict"

const {T} = require(`../readFormat`)
const V3_LAYERINFO = require(`./v3layerinfo`)
const V3_ZONE = require(`./v3zone`)
const V3_ENTITY = require(`./v3entity`)

module.exports = {
  signature: T.stringFixed(6),
  version: T.u32,
  scriptoffset: T.u32,
  mapname: T.stringFixed(256),
  vspFilename: T.stringFixed(256),
  musicname: T.stringFixed(256),
  renderString: T.stringFixed(256),
  startupscript: T.stringFixed(256),
  startx: T.u16,
  starty: T.u16,
  numlayers: T.u32,
  layers: T.list(V3_LAYERINFO, ({record}) => record.numlayers),
  obslayer: T.zlibU8(({record}) => record.layers[0].width * record.layers[0].height),
  zonelayer: T.zlibU16(({record}) => record.layers[0].width * record.layers[0].height),
  numzones: T.u32,
  zones: T.list(V3_ZONE, ({record}) => record.numzones),
  mapentities: T.u32,
  entity: T.list(V3_ENTITY, ({record}) => record.mapentities),
  // scriptsize: T.u32, // lua stuff? seems to get huge-normous values
  script: T.list(T.u8, ({reader}) => reader.remaining),//record.scriptsize),
}
