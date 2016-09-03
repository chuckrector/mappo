"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const numitems = reader.readStringAsByte()
    reader.readWhitespace()

    let equip = []
    for (let i = 0; i < numitems; i++) {
      let blob = {}

      while (!reader.atEnd() && !reader.atMatch('-')) {
        if (reader.atMatch('//')) {
          if (!('comments' in blob)) {
            blob.comments = []
          }

          blob.comments.push(reader.readLine())
        }

        if (reader.atMatch('ATK')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.str = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('DEF')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.end = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('MAG')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.mag = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('MGR')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.mgr = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('HIT')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.hit = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('DOD')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.dod = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('MBL')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.mbl = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('FER')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.fer = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('REA')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.rea = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('ONEQUIP')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.onequip = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('ONDEEQUIP')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.ondeequip = parseInt(reader.readStringVar(), 10)
        } else if (reader.atMatch('EQABLE')) {
          reader.readStringVar()
          reader.readWhitespace()
          blob.equipable = reader.readLine().split(' ').map((v) => parseInt(v, 10))
        }

        reader.readWhitespace()
      }

      if (reader.atMatch('-')) {
        reader.readByte()
      }

      reader.readWhitespace()

      equip.push(blob)
    }

    return {
      numitems,
      equip
    }
  }

  return {
    load
  }
}