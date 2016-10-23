"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({tileCount, tiledatabuf}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    tileCount,
    raw32bitData: colorDepth.convert24to32({raw24bitData: tiledatabuf}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}