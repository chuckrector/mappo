"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, tileCount, frames}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    tileCount,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: frames}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}