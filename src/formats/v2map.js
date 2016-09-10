"use strict"

const {T} = require('../readFormat')
const V2_LAYERINFO = require('./v2layerinfo')
const V2_ZONE = require('./v2zone')
const V2_ENTITY = require('./v2entity')

module.exports = {
  version: T.list(T.u8, 6),
  mapEventsOffset: T.u32,
  vspname: T.stringFixed(60),
  musname: T.stringFixed(60),
  rstring: T.stringFixed(20),
  xstart: T.u16,
  ystart: T.u16,
  wrap: T.u8,
  padding: T.list(T.u8, 50),
  numlayers: T.u8,
  layer: T.list(V2_LAYERINFO, ({record}) => record.numlayers),
  layers: T.list(
    T.compressedU16(({record, listIndex}) => {
      return record.layer[listIndex].sizex * record.layer[listIndex].sizey
    }),
    ({record}) => record.numlayers
  ),
  obstruct: T.compressedU8(({record}) => (
    record.layer[0].sizex * record.layer[0].sizey
  )),
  zone: T.compressedU8(({record}) => (
    record.layer[0].sizex * record.layer[0].sizey
  )),
  numzones: T.u32,
  zones: T.list(V2_ZONE, ({record}) => record.numzones),
  nmchr: T.u8,
  chrlist: T.list(T.stringFixed(60), ({record}) => record.nmchr),
  entities: T.u8,
  entity: T.list(V2_ENTITY, ({record}) => record.entities),
  nummovescripts: T.u8,
  msbufsize: T.u32,
  msofstbl: T.list(T.u32, ({record}) => record.nummovescripts),
  msbuf: T.list(T.u8, ({record}) => record.msbufsize),
  numthings: T.u32,
  mapevents: T.u32,
  mapvctbl: T.list(T.u32, ({record}) => record.mapevents),
  codesize: T.u32,
  mapvc: T.list(T.u8, ({record}) => record.codesize),
}
