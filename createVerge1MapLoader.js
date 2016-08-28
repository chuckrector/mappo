"use strict"

const fs = require('fs')
const createDataReader = require('./createDataReader')

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
    }
  }

  return {
    load
  }
}