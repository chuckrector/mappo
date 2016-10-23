"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, tileCount, speech}) => {
  const converter = createTileGridConverter({
    tileWidth: 32,
    tileHeight: 32,
    columns: 10,
    tileCount,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: speech}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}