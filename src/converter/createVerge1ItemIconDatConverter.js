"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, numtiles, itemicon}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles,
    raw8bitData: itemicon,
  })

  return {
    convertToPng: converter.convertToPng
  }
}