"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({fxsize, fysize, totalframes, imagedata}) => {
  const converter = createTileGridConverter({
    tileWidth: fxsize,
    tileHeight: fysize,
    columns: 5,
    numtiles: totalframes,
    raw32bitData: colorDepth.convert16to32({raw16bitData: imagedata}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
