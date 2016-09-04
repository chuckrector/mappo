"use strict"

const createTileGridConverter = require('./createTileGridConverter')

module.exports = ({palette, fxsize, fysize, totalframes, imagedata}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: fxsize,
    tileHeight: fysize,
    columns: totalframes,
    numtiles: totalframes,
    raw8bitData: imagedata,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
