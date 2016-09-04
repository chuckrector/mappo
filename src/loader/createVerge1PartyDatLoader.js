"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const tchars = reader.readStringAsByte()
    reader.readWhitespace()

    let party = []
    for (let i = 0; i < tchars; i++) {
      const chr = reader.readString()
      reader.readWhitespace()
      const cr2 = reader.readString()
      reader.readWhitespace()
      const dat = reader.readString()
      reader.readWhitespace()

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