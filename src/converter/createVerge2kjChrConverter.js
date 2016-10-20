"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({frameWidth, frameHeight, frameCount, imagedata}) => {
  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    numtiles: frameCount,
    raw32bitData: colorDepth.convert16to32({raw16bitData: imagedata}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
