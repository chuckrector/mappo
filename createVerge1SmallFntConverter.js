"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, fnt}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 7,
    tileHeight: 9,
    columns: 19,
    numtiles: 95,
    raw8bitData: fnt,
  })

  return {
    convertToPng: converter.convertToPng
  }
}