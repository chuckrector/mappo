"use strict"

const fs = require('fs')
const createDataReader = require('../createDataReader')
const assert = require('assert')

module.exports = (args) => {
  const reader = createDataReader(args)

  const loadZone = () => {
    const name = reader.readStringFixed(40)
    const script = reader.readWord()
    const percent = reader.readWord()
    const delay = reader.readWord()
    const aaa = reader.readWord()
    const entityscript = reader.readWord()

    return {
      name,
      script,
      percent,
      delay,
      aaa,
      entityscript,
    }
  }

  const loadEntity = () => {
    const startPosition = reader.position

    const x = reader.readQuad()
    const y = reader.readQuad()

    const tx = reader.readWord()
    const ty = reader.readWord()

    const facing = reader.readByte()
    const moving = reader.readByte()
    const movcnt = reader.readByte()
    const frame = reader.readByte()
    const specframe = reader.readByte()
    const chrindex = reader.readByte()
    const reset = reader.readByte()
    const obsmode1 = reader.readByte()
    const obsmode2 = reader.readByte()
    const speed = reader.readByte()
    const speedct = reader.readByte()
    const delayct = reader.readByte()

    const animofs = reader.readQuad()
    const scriptofs = reader.readQuad()

    const face = reader.readByte()
    const actm = reader.readByte()
    const movecode = reader.readByte()
    const movescript = reader.readByte()
    const ctr = reader.readByte()
    const mode = reader.readByte()
    const modePadding = reader.readByteArray(2)

    const step = reader.readWord()
    const delay = reader.readWord()
    const stepctr = reader.readWord()
    const delayctr = reader.readWord()
    const data1 = reader.readWord()
    const data2 = reader.readWord()
    const data3 = reader.readWord()
    const data4 = reader.readWord()
    const data5 = reader.readWord()
    const data6 = reader.readWord()

    const actscript = reader.readQuad()
    const expand1 = reader.readQuad()
    const expand2 = reader.readQuad()
    const expand3 = reader.readQuad()
    const expand4 = reader.readQuad()

    const desc = reader.readStringFixed(20)

    const bytesRead = reader.position - startPosition;
    assert.equal(bytesRead, 100, 'expected 100 bytes but read ' + bytesRead)

    return {
      x,
      y,
      tx,
      ty,
      facing,
      moving,
      movcnt,
      frame,
      specframe,
      chrindex,
      reset,
      obsmode1,
      obsmode2,
      speed,
      speedct,
      delayct,
      animofs,
      scriptofs,
      face,
      actm,
      movecode,
      movescript,
      ctr,
      mode,
      modePadding,
      step,
      delay,
      stepctr,
      delayctr,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      actscript,
      expand1,
      expand2,
      expand3,
      expand4,
      desc,
    }
  }

  const loadLayer = () => {
    const pmultx = reader.readByte()
    const pdivx = reader.readByte()
    const pmulty = reader.readByte()
    const pdivy = reader.readByte()
    const sizex = reader.readWord()
    const sizey = reader.readWord()
    const trans = reader.readByte()
    const hline = reader.readByte()
    const padding = reader.readByteArray(2)

    return {
      pmultx,
      pdivx,
      pmulty,
      pdivy,
      sizex,
      sizey,
      trans,
      hline,
      padding
    }
  }

  const load = () => {
    const version = reader.readByteArray(6)
    const mapEventsOffset = reader.readQuad()
    const vspname = reader.readStringFixed(60)
    const musname = reader.readStringFixed(60)
    const rstring = reader.readStringFixed(20)
    const xstart = reader.readWord()
    const ystart = reader.readWord()
    const wrap = reader.readByte() // TODO: verify not actually used in v2
    const padding = reader.readByteArray(50)
    const numlayers = reader.readByte()

    let layer = []
    for (let i = 0; i < numlayers; i++) {
      layer.push(loadLayer())
    }

    let layers = []
    for (let i = 0; i < numlayers; i++) {
      const length = layer[i].sizex * layer[i].sizey
      const decompressed = reader.readWordArrayCompressed(length)

      layers.push(decompressed)
    }

    const baseLayerLength = layer[0].sizex * layer[0].sizey
    const obstruct = reader.readByteArrayCompressed(baseLayerLength)
    const zone = reader.readByteArrayCompressed(baseLayerLength)

    const numzones = reader.readQuad()
    const zones = []
    for (let i = 0; i < numzones; i++) {
      zones.push(loadZone())
    }

    const nmchr = reader.readByte()
    const chrlist = []
    for (let i = 0; i < nmchr; i++) {
      chrlist.push(reader.readStringFixed(60))
    }

    const entities = reader.readByte()
    const entity = []
    for (let i = 0; i < entities; i++) {
      entity.push(loadEntity())
    }

    const nummovescripts = reader.readByte()
    const msbufsize = reader.readQuad()
    const msofstbl = reader.readQuadArray(nummovescripts)
    const msbuf = reader.readByteArray(msbufsize)

    const numthings = reader.readQuad()

    const mapevents = reader.readQuad()
    const mapvctbl = reader.readQuadArray(mapevents)
    const codesize = reader.readQuad()
    const mapvc = reader.readByteArray(codesize)

    return {
      version,
      mapEventsOffset,
      vspname,
      musname,
      rstring,
      xstart,
      ystart,
      wrap,
      padding,
      numlayers,
      layer,
      layers,
      obstruct,
      zone,
      numzones,
      zones,
      nmchr,
      chrlist,
      entities,
      entity,
      nummovescripts,
      msbufsize,
      msofstbl,
      msbuf,
      numthings,
      mapevents,
      mapvctbl,
      codesize,
      mapvc,
    }
  }

  return {
    load
  }
}