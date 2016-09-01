"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const tileWidth = 320
    const tileHeight = 66

    const tbox = reader.readByteArray(tileWidth * tileHeight)

    return {
      tbox
    }
  }

  return {
    load
  }
}