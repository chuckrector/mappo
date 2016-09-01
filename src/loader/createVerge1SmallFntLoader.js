"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 7
    const tileHeight = 9
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