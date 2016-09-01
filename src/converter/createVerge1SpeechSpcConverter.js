"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, numtiles, speech}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 32,
    tileHeight: 32,
    columns: 10,
    numtiles,
    raw8bitData: speech,
  })

  return {
    convertToPng: converter.convertToPng
  }
}