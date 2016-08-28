"use strict"

const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readWord()

    return {
      version,
    }
  }

  return {
    load
  }
}