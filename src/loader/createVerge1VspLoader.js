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
    const vsp0 = reader.readByteArray(numtiles * 16 * 16)

    let va0 = []
    for (let i = 0; i < 100; i++) {
      va0.push(loadAnim())
    }

    return {
      version,
      palette,
      numtiles,
      vsp0,
      va0,
    }
  }

  return {
    load
  }
}