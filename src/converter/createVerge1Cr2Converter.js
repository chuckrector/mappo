"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, images}) => {
  const converter = createTileGridConverter({
    palette,
    tileWidth: 96,
    tileHeight: 96,
    columns: 1,
    numtiles: 1,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: images}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}