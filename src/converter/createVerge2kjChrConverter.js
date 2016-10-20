"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({frameWidth, frameHeight, frameCount, frames}) => {
  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    numtiles: frameCount,
    raw32bitData: colorDepth.convert16to32({raw16bitData: frames}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
