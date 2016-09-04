"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const loadAnim = () => {
    const start = reader.readWord()
    const finish = reader.readWord()
    const delay = reader.readWord()
    const mode = reader.readWord()

    return {
      start,
      finish,
      delay,
      mode,
    }
  }

  const load = () => {
    const version = reader.readWord()
    const palette = reader.readByteArray(256 * 3)
    const numtiles = reader.readWord()
    const imagedata = reader.readByteArrayCompressed(numtiles * 16 * 16)

    let vspanim = []
    for (let i = 0; i < 100; i++) {
      vspanim.push(loadAnim())
    }

    return {
      version,
      palette,
      numtiles,
      imagedata,
      vspanim,
    }
  }

  return {
    load
  }
}