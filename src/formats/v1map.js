"use strict"

const {T} = require(`../readFormat`)
const V1_ZONE = require(`./v1zone`)
const V1_ENTITY = require(`./v1entity`)

module.exports = {
  version: T.u8,
  vspFilename: T.stringFixed(13),
  musicFilename: T.stringFixed(13),
  layerc: T.u8,
  pmultx: T.u8,
  pdivx: T.u8,
  levelname: T.stringFixed(30),
  showname: T.u8,
  saveflag: T.u8,
  startX: T.u16,
  startY: T.u16,
  hide: T.u8,
  warp: T.u8,
  xsize: T.u16,
  ysize: T.u16,
  b: T.u8,
  padding: T.list(T.u8, 27),
  layers: T.list(T.list(T.u16, ({record}) => record.width * record.height), 2),
  mapp: T.list(T.u8, ({record}) => record.width * record.height),
  zone: T.list(V1_ZONE, 128),
  chrlist: T.list(T.stringFixed(13), 100),
  entities: T.u32,
  party: T.list(V1_ENTITY, ({record}) => record.entities),
  nummovescripts: T.u8,
  msbufsize: T.u32,
  msofstbl: T.list(T.u32, ({record}) => record.nummovescripts),
  msbuf: T.list(T.u8, ({record}) => record.msbufsize),
  numscripts: T.u32,
  scriptofstbl: T.list(T.u32, ({record}) => record.numscripts),
  mapvc: T.list(T.u8, ({reader}) => reader.remaining),
}