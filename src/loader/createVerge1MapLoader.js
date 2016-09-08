"use strict"

const createDataReader = require('../createDataReader')
const assert = require('assert')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V1_ZONE = {
    zonename: T.stringFixed(15),
    zonenamePadding: T.u8,
    callevent: T.u16,
    percent: T.u8,
    delay: T.u8,
    aaa: T.u8,
    savedesc: T.stringFixed(30),
    savedescPadding: T.u8,
  }

  const V1_ENTITY = {
    x: T.u16,
    y: T.u16,
    facing: T.u8,
    moving: T.u8,
    movcnt: T.u8,
    framectr: T.u8,
    specframe: T.u8,
    chrindex: T.u8,
    movecode: T.u8,
    activmode: T.u8,
    obsmode: T.u8,
    padding: T.list(T.u8, 3),
    actscript: T.u32,
    movescript: T.u32,
    speed: T.u8,
    speedct: T.u8,
    step: T.u16,
    delay: T.u16,
    data1: T.u16,
    data2: T.u16,
    data3: T.u16,
    data4: T.u16,
    delayct: T.u16,
    adjactv: T.u16,
    x1: T.u16,
    y1: T.u16,
    x2: T.u16,
    y2: T.u16,
    curcmd: T.u8,
    cmdarg: T.u8,
    scriptofs: T.u32,
    face: T.u8,
    chasing: T.u8,
    chasespeed: T.u8,
    chasedist: T.u8,
    cx: T.u16,
    cy: T.u16,
    expand: T.u32,
    entitydesc: T.stringFixed(20),
  }

  const V1_MAP = {
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
    map0: T.list(T.u16, ({record}) => record.xsize * record.ysize),
    map1: T.list(T.u16, ({record}) => record.xsize * record.ysize),
    mapp: T.list(T.u8, ({record}) => record.xsize * record.ysize),
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

  return {
    load: () => readFormat({format: V1_MAP, reader})
  }
}