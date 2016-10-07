"use strict"

module.exports = ({
  context,
  tileset,
  tilesetImageBitmap,
  tileIndex,
  x,
  y,
  scaleWidth=tileset.tileWidth,
  scaleHeight=tileset.tileHeight,
}) => {
  const tileX = tileIndex % tileset.tileColumns
  const tileY = ~~(tileIndex / tileset.tileColumns)
  context.drawImage(
    tilesetImageBitmap,
    tileX * tileset.tileWidth,
    tileY * tileset.tileHeight,
    tileset.tileWidth,
    tileset.tileHeight,
    x, y,
    scaleWidth,
    scaleHeight
  )
}
