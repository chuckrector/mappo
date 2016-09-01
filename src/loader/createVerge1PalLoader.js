"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const pal = reader.readByteArray(256 * 3)

    return {
      pal
    }
  }

  return {
    load
  }
}