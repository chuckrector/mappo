"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readWord()
    const palette = reader.readByteArray(256 * 3)
    const numtiles = reader.readWord()
    const vsp0 = reader.readByteArray(numtiles * 16 * 16)

    return {
      version,
      palette,
      numtiles,
      vsp0,
    }
  }

  return {
    load
  }
}