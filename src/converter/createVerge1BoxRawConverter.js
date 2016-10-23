"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, transparentBox}) => {
  const converter = createTileGridConverter({
    tileWidth: 320,
    tileHeight: 66,
    columns: 1,
    tileCount: 1,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: transparentBox}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}