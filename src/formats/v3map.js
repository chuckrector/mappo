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
  vspname: T.stringFixed(256),
  musicname: T.stringFixed(256),
  renderstring: T.stringFixed(256),
  startupscript: T.stringFixed(256),
  startx: T.u16,
  starty: T.u16,
  numlayers: T.u32,
  layers: T.list(V3_LAYERINFO, ({o}) => o.numlayers),
  obslayer: T.zlibU8(({o}) => o.layers[0].width * o.layers[0].height),
  zonelayer: T.zlibU16(({o}) => o.layers[0].width * o.layers[0].height),
  numzones: T.u32,
  zones: T.list(V3_ZONE, ({o}) => o.numzones),
  mapentities: T.u32,
  entity: T.list(V3_ENTITY, ({o}) => o.mapentities),
  // scriptsize: T.u32, // lua stuff? seems to get huge-normous values
  script: T.list(T.u8, ({reader}) => reader.remaining),//o.scriptsize),
}
