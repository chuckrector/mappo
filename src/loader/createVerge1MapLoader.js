"use strict"

const fs = require('fs')
const createDataReader = require('../createDataReader')
const assert = require('assert')

module.exports = (args) => {
  const reader = createDataReader(args)

  const loadZone = () => {
    const zonename = reader.readString(15)
    const zonenamePadding = reader.readByte()
    const callevent = reader.readWord()
    const percent = reader.readByte()
    const delay = reader.readByte()
    const aaa = reader.readByte()
    const savedesc = reader.readString(30)
    const savedescPadding = reader.readByte()

    return {
      zonename,
      zonenamePadding,
      callevent,
      percent,
      delay,
      aaa,
      savedesc,
      savedescPadding,
    }
  }

  const loadEntity = () => {
    const startPosition = reader.position

    const x = reader.readWord()
    const y = reader.readWord() // 4
    const facing = reader.readByte()
    const moving = reader.readByte()
    const movcnt = reader.readByte()
    const framectr = reader.readByte()
    const specframe = reader.readByte()
    const chrindex = reader.readByte()
    const movecode = reader.readByte()
    const activmode = reader.readByte()
    const obsmode = reader.readByte() // 13 (#9)
    const padding = reader.readByteArray(3)
    const actscript = reader.readQuad()
    const movescript = reader.readQuad() // 22
    const speed = reader.readByte()
    const speedct = reader.readByte() // 24
    const step = reader.readWord()
    const delay = reader.readWord()
    const data1 = reader.readWord()
    const data2 = reader.readWord()
    const data3 = reader.readWord()
    const data4 = reader.readWord()
    const delayct = reader.readWord()
    const adjactv = reader.readWord()
    const x1 = reader.readWord()
    const y1 = reader.readWord()
    const x2 = reader.readWord()
    const y2 = reader.readWord() // 48
    const curcmd = reader.readByte()
    const cmdarg = reader.readByte() // 50
    const scriptofs = reader.readQuad() // 54
    const face = reader.readByte()
    const chasing = reader.readByte()
    const chasespeed = reader.readByte()
    const chasedist = reader.readByte() // 58
    const cx = reader.readWord()
    const cy = reader.readWord() // 62
    const expand = reader.readQuad() // 66
    const entitydesc = reader.readString(20) // 86

    const bytesRead = reader.position - startPosition;
    assert.equal(bytesRead, 88, 'expected 88 bytes but read ' + bytesRead)

    return {
      x,
      y,
      facing,
      moving,
      movcnt,
      framectr,
      specframe,
      chrindex,
      movecode,
      activmode,
      obsmode,
      padding,
      actscript,
      movescript,
      speed,
      speedct,
      step,
      delay,
      data1,
      data2,
      data3,
      data4,
      delayct,
      adjactv,
      x1,
      y1,
      x2,
      y2,
      curcmd,
      cmdarg,
      scriptofs,
      face,
      chasing,
      chasespeed,
      chasedist,
      cx,
      cy,
      expand,
      entitydesc,
    }
  }

  const load = () => {
    const version = reader.readByte()
    const vsp0name = reader.readString(13)
    const musname = reader.readString(13)
    const layerc = reader.readByte()
    const pmultx = reader.readByte()
    const pdivx = reader.readByte()
    const levelname = reader.readString(30)
    const showname = reader.readByte()
    const saveflag = reader.readByte()
    const startx = reader.readWord()
    const starty = reader.readWord()
    const hide = reader.readByte()
    const warp = reader.readByte()
    const xsize = reader.readWord()
    const ysize = reader.readWord()
    const b = reader.readByte()
    const padding = reader.readByteArray(27)
    const map0 = reader.readWordArray(xsize * ysize)
    const map1 = reader.readWordArray(xsize * ysize)
    const mapp = reader.readByteArray(xsize * ysize)

    let zone = []
    for (let i = 0; i < 128; i++) {
      zone.push(loadZone())
    }

    let chrlist = []
    for (let i = 0; i < 100; i++) {
      chrlist.push(reader.readString(13))
    }

    const entities = reader.readQuad()

    let party = []
    for (let i = 0; i < entities; i++) {
      party.push(loadEntity())
    }

    const nummovescripts = reader.readByte()
    const msbufsize = reader.readQuad()
    const msofstbl = reader.readQuadArray(nummovescripts)
    const msbuf = reader.readByteArray(msbufsize)

    const numscripts = reader.readQuad()
    const scriptofstbl = reader.readQuadArray(numscripts)
    const mapvc = reader.readByteArray(reader.length - reader.position)

    return {
      version,
      vsp0name,
      musname,
      layerc,
      pmultx,
      pdivx,
      levelname,
      showname,
      saveflag,
      startx,
      starty,
      hide,
      warp,
      xsize,
      ysize,
      b,
      padding,
      map0,
      map1,
      mapp,
      zone,
      chrlist,
      entities,
      party,
      nummovescripts,
      msbufsize,
      msofstbl,
      msbuf,
      numscripts,
      scriptofstbl,
      mapvc,
    }
  }

  return {
    load
  }
}