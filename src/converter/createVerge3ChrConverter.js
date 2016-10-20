"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({bpp, frameWidth, frameHeight, frameCount, frames}) => {
  if (bpp === 24) {
    frames = colorDepth.convert24to32({raw24bitData: frames})
  }

  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    numtiles: frameCount,
    raw32bitData: frames,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
