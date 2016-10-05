"use strict"

const {T} = require(`../readFormat`)
const V1_ZONE = require(`./v1zone`)
const V1_ENTITY = require(`./v1entity`)

module.exports = {
  version: T.u8,
  vsp0name: T.stringFixed(13),
  musname: T.stringFixed(13),
  layerc: T.u8,
  pmultx: T.u8,
  pdivx: T.u8,
  levelname: T.stringFixed(30),
  showname: T.u8,
  saveflag: T.u8,
  startx: T.u16,
  starty: T.u16,
  hide: T.u8,
  warp: T.u8,
  xsize: T.u16,
  ysize: T.u16,
  b: T.u8,
  padding: T.list(T.u8, 27),
  map0: T.list(T.u16, ({o}) => o.xsize * o.ysize),
  map1: T.list(T.u16, ({o}) => o.xsize * o.ysize),
  mapp: T.list(T.u8, ({o}) => o.xsize * o.ysize),
  zone: T.list(V1_ZONE, 128),
  chrlist: T.list(T.stringFixed(13), 100),
  entities: T.u32,
  party: T.list(V1_ENTITY, ({o}) => o.entities),
  nummovescripts: T.u8,
  msbufsize: T.u32,
  msofstbl: T.list(T.u32, ({o}) => o.nummovescripts),
  msbuf: T.list(T.u8, ({o}) => o.msbufsize),
  numscripts: T.u32,
  scriptofstbl: T.list(T.u32, ({o}) => o.numscripts),
  mapvc: T.list(T.u8, ({reader}) => reader.remaining),
}