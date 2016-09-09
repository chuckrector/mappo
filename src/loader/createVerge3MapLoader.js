"use strict"

const createDataReader = require('../createDataReader')
const assert = require('assert')
const {readFormat, T} = require('../readFormat')

module.exports = (args) => {
  const reader = createDataReader(args)

  const V3_ZONE = {
    name: T.stringFixed(256),
    script: T.stringFixed(256),
    percent: T.u8,
    delay: T.u8,
    method: T.u8,
  }

  const V3_ENTITY = {
    x1: T.u16,
    y1: T.u16,
    face: T.u8,
    obstructable: T.u8,
    obstruction: T.u8,
    autoface: T.u8,
    speed: T.u16,
    speedct: T.u8,
    delayct: T.u8,
    wx1: T.u16,
    wy1: T.u16,
    wx2: T.u16,
    wy2: T.u16,
    wdelay: T.u16,
    maybeOffset: T.u32,
    movescript: T.stringFixed(256),
    chrname: T.stringFixed(256),
    description: T.stringFixed(256),
    script: T.stringFixed(256),
  }

  const V3_LAYER = {
    layername: T.stringFixed(256),
    parallax_x: T.f64,
    parallax_y: T.f64,
    width: T.u16,
    height: T.u16,
    lucent: T.u8,
    tiledata: T.zlibU16(({record}) => record.width * record.height),
  }

  const V3_MAP = {
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
    layers: T.list(V3_LAYER, ({record}) => record.numlayers),
    obslayer: T.zlibU8(({record}) => record.layers[0].width * record.layers[0].height),
    zonelayer: T.zlibU16(({record}) => record.layers[0].width * record.layers[0].height),
    numzones: T.u32,
    zones: T.list(V3_ZONE, ({record}) => record.numzones),
    mapentities: T.u32,
    entity: T.list(V3_ENTITY, ({record}) => record.mapentities),
    // scriptsize: T.u32, // lua stuff? seems to get huge-normous values
    script: T.list(T.u8, ({reader}) => reader.remaining),//record.scriptsize),
  }

  return {
    load: () => readFormat({format: V3_MAP, reader})
  }
}