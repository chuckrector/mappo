"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const numitems = reader.readStringAsByte()

    let items = []
    for (let i = 0; i < numitems; i++) {
      const name = reader.readString()
      const icon = reader.readStringAsWord()
      const desc = reader.readString()
      const useflag = reader.readStringAsByte()
      const useeffect = reader.readStringAsWord()
      const itemtype = reader.readStringAsByte()
      const equipflag = reader.readStringAsByte()
      const equipidx = reader.readStringAsByte()
      const itmprv = reader.readStringAsByte()
      const price = reader.readStringAsQuad()

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