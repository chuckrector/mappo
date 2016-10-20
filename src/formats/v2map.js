"use strict"

const {T} = require(`../readFormat`)
const V2_LAYERINFO = require(`./v2layerinfo`)
const V2_ZONE = require(`./v2zone`)
const V2_ENTITY = require(`./v2entity`)

module.exports = {
  version: T.list(T.u8, 6),
  mapEventsOffset: T.u32,
  vspFilename: T.stringFixed(60),
  musicFilename: T.stringFixed(60),
  renderString: T.stringFixed(20),
  startX: T.u16,
  startY: T.u16,
  wrap: T.u8,
  padding: T.list(T.u8, 50),
  layerCount: T.u8,
  layerInfo: T.list(V2_LAYERINFO, ({record}) => record.layerCount),
  layers: T.list(
    T.compressedU16(({record, listIndex}) => {
      return record.layerInfo[listIndex].sizex * record.layerInfo[listIndex].sizey
    }),
    ({record}) => record.layerCount
  ),
  obstruct: T.compressedU8(({record}) => (
    record.layerInfo[0].sizex * record.layerInfo[0].sizey
  )),
  zone: T.compressedU8(({record}) => (
    record.layerInfo[0].sizex * record.layerInfo[0].sizey
  )),
  zoneCount: T.u32,
  zones: T.list(V2_ZONE, ({record}) => record.zoneCount),
  characterFilenameCount: T.u8,
  characterFilenames: T.list(T.stringFixed(60), ({record}) => record.characterFilenameCount),
  entityCount: T.u8,
  entity: T.list(V2_ENTITY, ({record}) => record.entityCount),
  movementScriptCount: T.u8,
  movementScriptBufferSize: T.u32,
  movementScriptOffsets: T.list(T.u32, ({record}) => record.movementScriptCount),
  movementScriptBuffer: T.list(T.u8, ({record}) => record.movementScriptBufferSize),
  thingCount: T.u32,
  scriptCount: T.u32,
  scriptOffsets: T.list(T.u32, ({record}) => record.scriptCount), // event offsets
  scriptBufferSize: T.u32,
  scriptBuffer: T.list(T.u8, ({record}) => record.scriptBufferSize),
}
