"use strict"

const createTileGridConverter = require('./createTileGridConverter')
const colorDepth = require('./colorDepth')

module.exports = ({bpp, fxsize, fysize, totalframes, imagedata}) => {
  if (bpp === 24) {
    imagedata = colorDepth.convert24to32({raw24bitData: imagedata})
  }

  const converter = createTileGridConverter({
    tileWidth: fxsize,
    tileHeight: fysize,
    columns: 5,
    numtiles: totalframes,
    raw32bitData: imagedata,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
