"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readWord()
    const palette = reader.readByteArray(256 * 3)

    return {
      version,
      palette,
    }
  }

  return {
    load
  }
}