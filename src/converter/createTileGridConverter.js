"use strict"

const {PNG} = require(`pngJS`)
const colorDepth = require(`./colorDepth`)
const roundedUpUnits = require(`../roundedUpUnits`)

module.exports = ({
  tileWidth,
  tileHeight,
  columns,
  numtiles,
  raw32bitData,
}) => {
  const rows = roundedUpUnits(numtiles, columns)
  const pngWidth = columns * tileWidth
  const pngHeight = rows * tileHeight

  // api:
  // - tileProcessor
  // - convertToPng
  // - blitRawToPng
  const api = {
    png: new PNG({width: pngWidth, height: pngHeight})
  }

  // Assume RAW<rawRect> source containing tile T<rawTileRect>:
  //
  // +-------+
  // | RAW   |
  // |   +---|
  // |   | T |
  // +-------+
  //
  // And dest PNG<pngRect> with blit destination D<pngDestRect>:
  //
  // +---------+
  // | D |     |
  // |---+     |
  // |   PNG   |
  // |         |
  // |         |
  // +---------+
  //
  // Rect = {x, y, width, height}
  //
  // PNG is expected to be RGBA, i.e. pngRect.width*pngRect.height*4 bytes.
  //
  const blitRawToPng = ({
    // expected to be 32-bit RGBA
    rawData,
    // width,height only; x,y ignored
    rawRect,
    rawTileRect,
    pngData,
    // width,height only; x,y ignored
    pngRect,
    // x,y only; assumed to be rawTileRect.width x rawTileRect.height
    pngDestRect,
  }) => {
    for (let y = 0; y < rawTileRect.height; y++) {
      for (let x = 0; x < rawTileRect.width; x++) {
        const rawX = rawTileRect.x + x
        const rawY = rawTileRect.y + y
        const rawOffset = ((rawY * rawRect.width) + rawX) * 4
        const pngX = pngDestRect.x + x
        const pngY = pngDestRect.y + y
        const pngOffset = ((pngY * pngRect.width) + pngX) * 4

        if (pngOffset >= pngData.length) {
          break;
        }

        if (rawOffset < rawData.length) {
          pngData[pngOffset + 0] = rawData[rawOffset + 0]
          pngData[pngOffset + 1] = rawData[rawOffset + 1]
          pngData[pngOffset + 2] = rawData[rawOffset + 2]
          pngData[pngOffset + 3] = rawData[rawOffset + 3]
        } else {
          pngData[pngOffset + 0] = 0xff
          pngData[pngOffset + 1] = 0
          pngData[pngOffset + 2] = 0xff
          pngData[pngOffset + 3] = 0
        }
      }
    }
  }

  const tileProcessor = ({
    rawData,
    rawRect,
    pngData,
    pngRect,
    tileIndex,
    tileX,
    tileY,
  }) => {
    blitRawToPng({
      rawData,
      rawRect,
      rawTileRect: {
        x: 0,
        y: tileIndex * tileHeight,
        width: tileWidth,
        height: tileHeight,
      },
      pngData,
      pngRect,
      pngDestRect: {
        x: tileX,
        y: tileY,
      },
    })
  }

  const convertToPng = () => {
    const rawData = raw32bitData
    const rawRect = {
      width: tileWidth,
      height: tileHeight * numtiles,
    }
    const pngData = api.png.data
    const pngRect = {
      width: pngWidth,
      height: pngHeight,
    }

    for (let tileIndex = 0; tileIndex < rows * columns; tileIndex++) {
      const tileColumn = tileIndex % columns
      const tileRow = Math.floor(tileIndex / columns)

      api.tileProcessor({
        rawData,
        rawRect,
        pngData,
        pngRect,
        tileIndex,
        tileX: tileColumn * tileWidth,
        tileY: tileRow * tileHeight,
      })
    }

    return api.png
  }

  api.tileProcessor = tileProcessor
  api.convertToPng = convertToPng
  api.blitRawToPng = blitRawToPng

  return api
}
