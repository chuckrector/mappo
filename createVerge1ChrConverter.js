"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, chrs}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 16,
    tileHeight: 32,
    columns: 5,
    numtiles: 30,
    raw8bitData: chrs,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
