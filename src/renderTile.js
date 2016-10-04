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
  context.drawImage(
    tilesetImageBitmap,
    0, tileIndex * tileset.tileHeight,
    tileset.tileWidth,
    tileset.tileHeight,
    x, y,
    scaleWidth,
    scaleHeight
  )
}
