"use strict"

module.exports = ({
  context,
  tileset,
  tileIndex,
  x,
  y,
  scaleWidth=tileset.tileWidth,
  scaleHeight=tileset.tileHeight,
}) => {
  context.drawImage(
    tileset.imageBitmap,
    0, tileIndex * tileset.tileHeight,
    tileset.tileWidth,
    tileset.tileHeight,
    x, y,
    scaleWidth,
    scaleHeight
  )
}
