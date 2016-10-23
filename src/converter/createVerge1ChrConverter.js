"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, frames}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 32,
    columns: 5,
    tileCount: 30,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: frames}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
