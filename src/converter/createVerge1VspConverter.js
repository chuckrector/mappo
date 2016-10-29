"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, tileCount, tiles}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    tileCount,
    raw32bitData: colorDepth.convert8to32({
      palette: palette.map(v => v * 4),
      raw8bitData: tiles,
    }),
  })

  return {
    convertToPng: converter.convertToPng
  }
}