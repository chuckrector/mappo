"use strict"

const createTileGridConverter = require(`./createTileGridConverter`)
const filler = require(`../filler`)
const colorDepth = require(`./colorDepth`)

module.exports = ({
  palette,
  tileCount,
  menuPointer,
  itemPointer,
  characterPointer,
}) => {
  const menuPointerTileWidth = 16
  const menuPointerTileHeight = 16
  const itemPointerTileWidth = 24
  const itemPointerTileHeight = 24
  const characterPointerTileWidth = 24
  const characterPointerTileHeight = 40
  const pngWidth = menuPointerTileWidth + itemPointerTileWidth + characterPointerTileWidth
  const pngHeight = characterPointerTileHeight
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
      rawData: characterPointer,
      rawRect: {
        width: characterPointerTileWidth,
        height: characterPointerTileHeight,
      },
      rawTileRect: {
        x: 0,
        y: 0,
        width: characterPointerTileWidth,
        height: characterPointerTileHeight,
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