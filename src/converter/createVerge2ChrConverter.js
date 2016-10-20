"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, frameWidth, frameHeight, frameCount, imagedata}) => {
  const converter = createTileGridConverter({
    tileWidth: frameWidth,
    tileHeight: frameHeight,
    columns: 5,
    numtiles: frameCount,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: imagedata}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
