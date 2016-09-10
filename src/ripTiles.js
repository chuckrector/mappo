"use strict"

module.exports = ({
  raw32BitData,
  raw32BitDataWidth,
  raw32BitDataHeight,
  ripFromX,
  ripFromY,
  tileWidth,
  tileHeight,
  numTiles,
  numColumns,
}) => {
  const tileList = []

  const ripTile = ({pixelX, pixelY}) => {
    const tileData = []

    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        const raw32BitDataX = pixelX + x
        const raw32BitDataY = pixelY + y
        const raw32BitDataOffset = ((raw32BitDataY * raw32BitDataWidth) + raw32BitDataX) * 4
        const r = raw32BitData[raw32BitDataOffset + 0]
        const g = raw32BitData[raw32BitDataOffset + 1]
        const b = raw32BitData[raw32BitDataOffset + 2]
        const a = raw32BitData[raw32BitDataOffset + 3]

        tileData.push(r, g, b, a)
      }
    }

    return tileData
  }

  for (let tileIndex = 0; tileIndex < numTiles; tileIndex++) {
    const tileColumn = tileIndex % numColumns
    const tileRow = Math.floor(tileIndex / numColumns)
    const pixelX = ripFromX + (tileColumn * tileWidth)
    const pixelY = ripFromY + (tileRow * tileHeight)
    const tile = ripTile({pixelX, pixelY})

    tileList.push(tile)
  }

  return tileList
}