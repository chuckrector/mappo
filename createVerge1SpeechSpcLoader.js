"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 32
    const tileHeight = 32

    const speech = reader.readByteArray(tileWidth * tileHeight)

    return {
      speech
    }
  }

  return {
    load
  }
}