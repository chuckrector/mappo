"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({numtiles, tiledatabuf}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles,
    raw32bitData: colorDepth.convert24to32({raw24bitData: tiledatabuf}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}