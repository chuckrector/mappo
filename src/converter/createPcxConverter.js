"use strict"

const createTileGridConverter = require('./createTileGridConverter')
const colorDepth = require('./colorDepth')

module.exports = ({palette, tileWidth, tileHeight, raw8bitData}) => {
  const converter = createTileGridConverter({
    tileWidth,
    tileHeight,
    columns: 1,
    numtiles: 1,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData})
  })

  return {
    convertToPng: converter.convertToPng
  }
}