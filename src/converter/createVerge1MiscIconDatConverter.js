"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const filler = require(`../filler`)
const colorDepth = require(`./colorDepth`)

module.exports = ({
  palette,
  tileCount,
  menuptr,
  itmptr,
  charptr,
}) => {
  const menuptrTileWidth = 16
  const menuptrTileHeight = 16
  const itmptrTileWidth = 24
  const itmptrTileHeight = 24
  const charptrTileWidth = 24
  const charptrTileHeight = 40
  const pngWidth = menuptrTileWidth + itmptrTileWidth + charptrTileWidth
  const pngHeight = charptrTileHeight
  const raw8bitData = filler(pngWidth * pngHeight)

  const converter = createTileGridConverter({
    tileWidth: pngWidth,
    tileHeight: pngHeight,
    columns: 1,
    tileCount: 1,
    raw32bitData: colorDepth.convert8to32({palette, raw8bitData}),
  })

  const convertToPng = () => {
    const pngData = converter.png.data
    const pngRect = converter.png

    converter.blitRawToPng({
      rawData: menuptr,
      rawRect: {
        width: menuptrTileWidth,
        height: menuptrTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: menuptrTileWidth,
        height: menuptrTileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: 0,
        y: 0,
      },
    })

    converter.blitRawToPng({
      rawData: itmptr,
      rawRect: {
        width: itmptrTileWidth,
        height: itmptrTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: itmptrTileWidth,
        height: itmptrTileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: menuptrTileWidth,
        y: 0,
      },
    })

    converter.blitRawToPng({
      rawData: charptr,
      rawRect: {
        width: charptrTileWidth,
        height: charptrTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: charptrTileWidth,
        height: charptrTileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: menuptrTileWidth + itmptrTileWidth,
        y: 0,
      },
    })

    return converter.png
  }

  return {
    convertToPng
  }
}