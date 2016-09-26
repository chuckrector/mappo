"use strict"

const createDataReader = require(`../createDataReader`)

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    reader.readWhitespace()
    const numitems = reader.readStringAsByte()

    let equip = []
    for (let i = 0; i < numitems; i++) {
      let blob = {}

      while (!reader.atEnd() && !reader.atMatch(`-`)) {
        if (reader.atMatch(`//`)) {
          if (!(`comments` in blob)) {
            blob.comments = []
          }

          blob.comments.push(reader.readLine())
        }

        if (reader.atMatch(`ATK`)) {
          reader.readString()
          blob.str = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`DEF`)) {
          reader.readString()
          blob.end = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`MAG`)) {
          reader.readString()
          blob.mag = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`MGR`)) {
          reader.readString()
          blob.mgr = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`HIT`)) {
          reader.readString()
          blob.hit = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`DOD`)) {
          reader.readString()
          blob.dod = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`MBL`)) {
          reader.readString()
          blob.mbl = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`FER`)) {
          reader.readString()
          blob.fer = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`REA`)) {
          reader.readString()
          blob.rea = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`ONEQUIP`)) {
          reader.readString()
          blob.onequip = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`ONDEEQUIP`)) {
          reader.readString()
          blob.ondeequip = parseInt(reader.readString(), 10)
        } else if (reader.atMatch(`EQABLE`)) {
          reader.readString()
          blob.equipable = reader.readLine().split(` `).map((v) => parseInt(v, 10))
        }

        reader.readWhitespace()
      }

      if (reader.atMatch(`-`)) {
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