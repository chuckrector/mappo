"use strict"

module.exports = ({
  context,
  tileset,
  tilesetImageBitmap,
  tileIndex,
  x,
  y,
  scaleWidth=tileset.get(`tileWidth`),
  scaleHeight=tileset.get(`tileHeight`),
}) => {
  const tileX = tileIndex % tileset.get(`tileColumns`)
  const tileY = ~~(tileIndex / tileset.get(`tileColumns`))
  context.drawImage(
    tilesetImageBitmap,
    tileX * tileset.get(`tileWidth`),
    tileY * tileset.get(`tileHeight`),
    tileset.get(`tileWidth`),
    tileset.get(`tileHeight`),
    x, y,
    scaleWidth,
    scaleHeight
  )
}
