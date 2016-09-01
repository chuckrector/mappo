"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 32
    const tileHeight = 32

    const numtiles = reader.readByte()
    const speech = reader.readByteArray(tileWidth * tileHeight * numtiles)

    return {
      numtiles,
      speech
    }
  }

  return {
    load
  }
}