"use strict"

const createDataReader = require('../createDataReader')

module.exports = (args) => {
  const reader = createDataReader(args)

  const load = () => {
    const menuptrTileWidth = 16
    const menuptrTileHeight = 16
    const itmptrTileWidth = 24
    const itmptrTileHeight = 24
    const charptrTileWidth = 24
    const charptrTileHeight = 40

    const numtiles = reader.readByte()
    const menuptr = reader.readByteArray(menuptrTileWidth * menuptrTileHeight)
    const itmptr = reader.readByteArray(itmptrTileWidth * itmptrTileHeight)
    const charptr = reader.readByteArray(charptrTileWidth * charptrTileHeight)

    return {
      numtiles,
      menuptr,
      itmptr,
      charptr,
    }
  }

  return {
    load
  }
}