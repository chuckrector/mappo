"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const filler = require(`../filler`)
const colorDepth = require(`./colorDepth`)

module.exports = ({
  palette,
  tileCount,
  menuPointer,
  itemPointer,
  charptr,
}) => {
  const menuPointerTileWidth = 16
  const menuPointerTileHeight = 16
  const itemPointerTileWidth = 24
  const itemPointerTileHeight = 24
  const charptrTileWidth = 24
  const charptrTileHeight = 40
  const pngWidth = menuPointerTileWidth + itemPointerTileWidth + charptrTileWidth
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
      rawData: menuPointer,
      rawRect: {
        width: menuPointerTileWidth,
        height: menuPointerTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: menuPointerTileWidth,
        height: menuPointerTileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: 0,
        y: 0,
      },
    })

    converter.blitRawToPng({
      rawData: itemPointer,
      rawRect: {
        width: itemPointerTileWidth,
        height: itemPointerTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: itemPointerTileWidth,
        height: itemPointerTileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: menuPointerTileWidth,
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
        x: menuPointerTileWidth + itemPointerTileWidth,
        y: 0,
      },
    })

    return converter.png
  }

  return {
    convertToPng
  }
}