"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readByte()
    const fxsize = reader.readWord()
    const fysize = reader.readWord()
    const hx = reader.readWord()
    const hy = reader.readWord()
    const hw = reader.readWord()
    const hh = reader.readWord()
    const totalframes = reader.readWord()
    const imagedata = reader.readByteArrayCompressed(fxsize * fysize * totalframes)
    const lidle = reader.readQuad()
    const ridle = reader.readQuad()
    const uidle = reader.readQuad()
    const didle = reader.readQuad()
    const lanimLength = reader.readQuad()
    const lanim = reader.readStringFixed(lanimLength)
    const ranimLength = reader.readQuad()
    const ranim = reader.readStringFixed(ranimLength)
    const uanimLength = reader.readQuad()
    const uanim = reader.readStringFixed(uanimLength)
    const danimLength = reader.readQuad()
    const danim = reader.readStringFixed(danimLength)

    return {
      version,
      fxsize,
      fysize,
      hx,
      hy,
      hw,
      hh,
      totalframes,
      imagedata,
      lidle,
      ridle,
      uidle,
      didle,
      lanimLength,
      lanim,
      ranimLength,
      ranim,
      uanimLength,
      uanim,
      danimLength,
      danim,
    }
  }

  return {
    load
  }
}