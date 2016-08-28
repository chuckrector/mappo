"use strict"

const fs = require('fs')
const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readByte()

    return {
      version
    }
  }

  return {
    load
  }
}