"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({tileCount, tiles}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    tileCount,
    raw32bitData: colorDepth.convert24to32({raw24bitData: tiles}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}