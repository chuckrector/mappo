"use strict"

const createDataReader = require('../createDataReader')
const assert = require('assert')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V2_ZONE = {
    name: T.stringFixed(40),
    script: T.u16,
    percent: T.u16,
    delay: T.u16,
    aaa: T.u16,
    entityscript: T.u16,
  }

  const V2_ENTITY = {
    x: T.u32,
    y: T.u32,
    tx: T.u16,
    ty: T.u16,
    facing: T.u8,
    moving: T.u8,
    movcnt: T.u8,
    frame: T.u8,
    specframe: T.u8,
    chrindex: T.u8,
    reset: T.u8,
    obsmode1: T.u8,
    obsmode2: T.u8,
    speed: T.u8,
    speedct: T.u8,
    delayct: T.u8,
    animofs: T.u32,
    scriptofs: T.u32,
    face: T.u8,
    actm: T.u8,
    movecode: T.u8,
    movescript: T.u8,
    ctr: T.u8,
    mode: T.u8,
    modePadding: T.list(T.u8, 2),
    step: T.u16,
    delay: T.u16,
    stepctr: T.u16,
    delayctr: T.u16,
    data1: T.u16,
    data2: T.u16,
    data3: T.u16,
    data4: T.u16,
    data5: T.u16,
    data6: T.u16,
    actscript: T.u32,
    expand1: T.u32,
    expand2: T.u32,
    expand3: T.u32,
    expand4: T.u32,
    desc: T.stringFixed(20),
  }

  const V2_LAYER = {
    pmultx: T.u8,
    pdivx: T.u8,
    pmulty: T.u8,
    pdivy: T.u8,
    sizex: T.u16,
    sizey: T.u16,
    trans: T.u8,
    hline: T.u8,
    padding: T.list(T.u8, 2),
  }

  const V2_MAP = {
    version: T.list(T.u8, 6),
    mapEventsOffset: T.u32,
    vspname: T.stringFixed(60),
    musname: T.stringFixed(60),
    rstring: T.stringFixed(20),
    xstart: T.u16,
    ystart: T.u16,
    wrap: T.u8, // TODO: verify not actually used in v2
    padding: T.list(T.u8, 50),

    numlayers: T.u8,
    layer: T.list(V2_LAYER, ({record}) => record.numlayers),
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

  return {
    load: () => readFormat({format: V2_MAP, reader})
  }
}