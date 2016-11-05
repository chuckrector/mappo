"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({bitsPerPixel, frameWidth, frameHeight, frameCount, frames}) => {
  if (bitsPerPixel === 24) {
    frames = colorDepth.convert24to32({raw24bitData: frames})
  }

  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    tileCount: frameCount,
    raw32bitData: frames,
  })

  return {
    convertToPng: converter.convertToPng
  }
}
