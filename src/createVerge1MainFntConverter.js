"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, fnt2}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 9,
    tileHeight: 16,
    columns: 19,
    numtiles: 95,
    raw8bitData: fnt2,
  })

  return {
    convertToPng: converter.convertToPng
  }
}