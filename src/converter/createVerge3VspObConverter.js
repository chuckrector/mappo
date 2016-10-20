"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const colorDepth = require(`./colorDepth`)

module.exports = ({palette, obstructionCount, obstructions}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 16,
    columns: 20,
    numtiles: obstructionCount,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: obstructions}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}