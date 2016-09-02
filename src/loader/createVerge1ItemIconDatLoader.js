"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 16
    const tileHeight = 16
    const numtiles = reader.readByte()
    const itemicons = reader.readByteArray(tileWidth * tileHeight * numtiles)

    return {
      numtiles,
      itemicons
    }
  }

  return {
    load
  }
}