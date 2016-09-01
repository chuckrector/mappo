"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 96
    const tileHeight = 96

    const chr2 = reader.readByteArray(tileWidth * tileHeight)

    return {
      chr2
    }
  }

  return {
    load
  }
}