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
          reader.readString()
          reader.readWhitespace()
          blob.str = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('DEF')) {
          reader.readString()
          reader.readWhitespace()
          blob.end = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('MAG')) {
          reader.readString()
          reader.readWhitespace()
          blob.mag = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('MGR')) {
          reader.readString()
          reader.readWhitespace()
          blob.mgr = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('HIT')) {
          reader.readString()
          reader.readWhitespace()
          blob.hit = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('DOD')) {
          reader.readString()
          reader.readWhitespace()
          blob.dod = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('MBL')) {
          reader.readString()
          reader.readWhitespace()
          blob.mbl = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('FER')) {
          reader.readString()
          reader.readWhitespace()
          blob.fer = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('REA')) {
          reader.readString()
          reader.readWhitespace()
          blob.rea = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('ONEQUIP')) {
          reader.readString()
          reader.readWhitespace()
          blob.onequip = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('ONDEEQUIP')) {
          reader.readString()
          reader.readWhitespace()
          blob.ondeequip = parseInt(reader.readString(), 10)
        } else if (reader.atMatch('EQABLE')) {
          reader.readString()
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