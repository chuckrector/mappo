"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, numtiles, imagedata}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles,
    raw8bitData: imagedata,
  })

  return {
    convertToPng: converter.convertToPng
  }
}