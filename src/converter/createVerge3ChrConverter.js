"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({bpp, frameWidth, frameHeight, totalframes, imagedata}) => {
  if (bpp === 24) {
    imagedata = colorDepth.convert24to32({raw24bitData: imagedata})
  }

  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    numtiles: totalframes,
    raw32bitData: imagedata,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
