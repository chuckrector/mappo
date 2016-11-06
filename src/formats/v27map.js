"use strict"

const {T} = require(`../readFormat`)
const V27_LAYERINFO = require(`./v27layerinfo`)
const V27_ZONE = require(`./v27zone`)
const V27_ENTITY = require(`./v27entity`)

module.exports = {
  version: T.list(T.u8, 6),
  vspFilename: T.stringLengthEncoded,
  musicFilename: T.stringLengthEncoded,
  renderString: T.stringLengthEncoded,
  width: T.u32,
  height: T.u32,
  startX: T.u32,
  startY: T.u32,
  wrap: T.u8,
  numLayers: T.u32,
  layerInfo: T.list(V27_LAYERINFO, ({record}) => record.numLayers),
  layers: T.list(
    T.ikaZlibU32(({record}) => record.width * record.height),
    ({record}) => record.numLayers
  ),
  obstructionLayer: T.ikaZlibU8(({record}) => record.width * record.height),
  zoneLayers: T.ikaZlibU32(({record}) => record.width * record.height),
  numZones: T.u32,
  zones: T.list(V27_ZONE, ({record}) => record.numZones),
  entityCount: T.u32,
  entities: T.list(V27_ENTITY, ({record}) => record.entityCount),
}
