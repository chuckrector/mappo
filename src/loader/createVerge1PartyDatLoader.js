"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const tchars = reader.readStringAsByte()

    let party = []
    for (let i = 0; i < tchars; i++) {
      const chr = reader.readString()
      const cr2 = reader.readString()
      const dat = reader.readString()

      party.push({chr, cr2, dat})
    }

    return {
      tchars,
      party
    }
  }

  return {
    load
  }
}