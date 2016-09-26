"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, tbox}) => {
  const converter = createTileGridConverter({
    tileWidth: 320,
    tileHeight: 66,
    columns: 1,
    numtiles: 1,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: tbox}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}