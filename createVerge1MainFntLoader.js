"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 9
    const tileHeight = 16
    const numtiles = 95

    const fnt = reader.readByteArray(tileWidth * tileHeight * numtiles)

    return {
      fnt
    }
  }

  return {
    load
  }
}