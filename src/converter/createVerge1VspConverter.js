"use strict"

const createTileGridConverter = require('./createTileGridConverter')
const colorDepth = require('./colorDepth')

module.exports = ({palette, numtiles, vsp0}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles,
    raw32bitData: colorDepth.convert8to32({
      palette: palette.map(v => v * 4),
      raw8bitData: vsp0,
    }),
  })

  return {
    convertToPng: converter.convertToPng
  }
}