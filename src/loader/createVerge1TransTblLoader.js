"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const transparencytbl = reader.readByteArray(256 * 256)

    return {
      transparencytbl
    }
  }

  return {
    load
  }
}