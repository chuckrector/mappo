"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, images}) => {
  const converter = createTileGridConverter({
    tileWidth: 9,
    tileHeight: 16,
    columns: 19,
    tileCount: 95,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: images}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}