"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, tbox}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 320,
    tileHeight: 66,
    columns: 1,
    numtiles: 1,
    raw8bitData: tbox,
  })

  return {
    convertToPng: converter.convertToPng
  }
}