"use strict"

const fs = require('fs')
const createDataReader = require('./createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const version = reader.readByte()
    const vsp0name = reader.readString(13)
    const musname = reader.readString(13)
    const layerc = reader.readByte()
    const pmultx = reader.readByte()
    const pdivx = reader.readByte()
    const levelname = reader.readString(30)
    const showname = reader.readByte()
    const saveflag = reader.readByte()

    return {
      version,
      vsp0name,
      musname,
      layerc,
      pmultx,
      pdivx,
      levelname,
      showname,
      saveflag,
    }
  }

  return {
    load
  }
}