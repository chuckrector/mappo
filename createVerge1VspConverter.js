"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, numtiles, vsp0}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles,
    raw8bitData: vsp0,
  })

  return {
    convertToPng: converter.convertToPng
  }
}