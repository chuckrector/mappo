"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, tileWidth, tileHeight, raw8bitData}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth,
    tileHeight,
    columns: 1,
    numtiles: 1,
    raw8bitData,
  })

  return {
    convertToPng: converter.convertToPng
  }
}