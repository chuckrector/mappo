"use strict"

const {T} = require(`../readFormat`)
const V2_LAYERINFO = require(`./v2layerinfo`)
const V2_ZONE = require(`./v2zone`)
const V2_ENTITY = require(`./v2entity`)

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
  layerInfo: T.list(V2_LAYERINFO, ({o}) => o.numlayers),
  layers: T.list(
    T.compressedU16(({o, listIndex}) => {
      return o.layerInfo[listIndex].sizex * o.layerInfo[listIndex].sizey
    }),
    ({o}) => o.numlayers
  ),
  obstruct: T.compressedU8(({o}) => (
    o.layerInfo[0].sizex * o.layerInfo[0].sizey
  )),
  zone: T.compressedU8(({o}) => (
    o.layerInfo[0].sizex * o.layerInfo[0].sizey
  )),
  numzones: T.u32,
  zones: T.list(V2_ZONE, ({o}) => o.numzones),
  nmchr: T.u8,
  chrlist: T.list(T.stringFixed(60), ({o}) => o.nmchr),
  entities: T.u8,
  entity: T.list(V2_ENTITY, ({o}) => o.entities),
  nummovescripts: T.u8,
  msbufsize: T.u32,
  msofstbl: T.list(T.u32, ({o}) => o.nummovescripts),
  msbuf: T.list(T.u8, ({o}) => o.msbufsize),
  numthings: T.u32,
  mapevents: T.u32,
  mapvctbl: T.list(T.u32, ({o}) => o.mapevents), // event offsets
  codesize: T.u32,
  mapvc: T.list(T.u8, ({o}) => o.codesize),
}
