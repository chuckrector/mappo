"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const numitems = reader.readStringAsByte()
    reader.readWhitespace()

    let items = []
    for (let i = 0; i < numitems; i++) {
      const name = reader.readString()
      reader.readWhitespace()
      const icon = reader.readStringAsWord()
      reader.readWhitespace()
      const desc = reader.readString()
      reader.readWhitespace()
      const useflag = reader.readStringAsByte()
      reader.readWhitespace()
      const useeffect = reader.readStringAsWord()
      reader.readWhitespace()
      const itemtype = reader.readStringAsByte()
      reader.readWhitespace()
      const equipflag = reader.readStringAsByte()
      reader.readWhitespace()
      const equipidx = reader.readStringAsByte()
      reader.readWhitespace()
      const itmprv = reader.readStringAsByte()
      reader.readWhitespace()
      const price = reader.readStringAsQuad()
      reader.readWhitespace()

      items.push({
        name,
        icon,
        desc,
        useflag,
        useeffect,
        itemtype,
        equipflag,
        equipidx,
        itmprv,
        price,
      })
    }

    return {
      numitems,
      items
    }
  }

  return {
    load
  }
}