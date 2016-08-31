"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const chrs = reader.readByteArray(16 * 32 * 30)

    return {
      chrs
    }
  }

  return {
    load
  }
}