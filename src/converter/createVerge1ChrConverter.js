"use strict"

const createTileGridConverter = require('./createTileGridConverter')
const colorDepth = require('./colorDepth')

module.exports = ({palette, chrs}) => {
  const converter = createTileGridConverter({
    tileWidth: 16,
    tileHeight: 32,
    columns: 5,
    numtiles: 30,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData: chrs}),
  })

  return {
    convertToPng: converter.convertToPng
  }
}
