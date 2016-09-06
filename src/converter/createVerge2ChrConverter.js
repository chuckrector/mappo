"use strict"

const createTileGridConverter = require('./createTileGridConverter')
const colorDepth = require('./colorDepth')

module.exports = ({palette, fxsize, fysize, totalframes, imagedata}) => {
  const converter = createTileGridConverter({
    tileWidth: fxsize,
    tileHeight: fysize,
    columns: 5,
    numtiles: totalframes,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: imagedata}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
