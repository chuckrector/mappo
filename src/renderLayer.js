"use strict"

const renderTile = require(`./renderTile`)

module.exports = ({
  context,
  canvas,
  tileset,
  tilesetImageBitmap,
  layer,
  x,
  y,
  transparent=false,
}) => {
  x = ~~x
  y = ~~y

  const tileWidth = tileset.get(`tileWidth`)
  const tileHeight = tileset.get(`tileHeight`)
  const tileStartX = Math.floor(x / tileWidth)
  const tileStartY = Math.floor(y / tileHeight)
  const subTileX = x % tileWidth
  const subTileY = y % tileHeight
  const pixelStartX = -subTileX
  const pixelStartY = -subTileY

  let pixelEndX = canvas.width
  let pixelEndY = canvas.height
  let tileEndX = Math.floor(pixelEndX / tileWidth)
  let tileEndY = Math.floor(pixelEndX / tileHeight)

  if (tileEndX > layer.get(`width`)) {
    const tileOverflow = tileEndX - layer.get(`width`)
    tileEndX = layer.get(`width`)
    pixelEndX -= tileOverflow * tileWidth
  }

  if (tileEndY > layer.get(`height`)) {
    const tileOverflow = tileEndY - tileHeight
    tileEndY = layer.get(`height`)
    pixelEndY -= tileOverflow * tileHeight
  }

  const tileIndexGrid = layer.get(`tileIndexGrid`)

  let pixelY = pixelStartY
  let tileY = tileStartY

  while (pixelY < pixelEndY) {
    let pixelX = pixelStartX
    let tileX = tileStartX

    while (pixelX < pixelEndX) {
      const tileIndex = tileIndexGrid.get((tileY * layer.get(`width`)) + tileX)

      if (tileIndex || !transparent) {
        renderTile({
          context,
          tileset,
          tilesetImageBitmap,
          tileIndex,
          x: pixelX,
          y: pixelY,
        })
      }

      pixelX += tileWidth
      tileX++
    }

    pixelY += tileHeight
    tileY++
  }

  return {
    tileStartX,
    tileStartY,
    pixelStartX,
    pixelStartY,
  }
}
