"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, chr2}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 96,
    tileHeight: 96,
    columns: 1,
    numtiles: 1,
    raw8bitData: chr2,
  })

  return {
    convertToPng: converter.convertToPng
  }
}