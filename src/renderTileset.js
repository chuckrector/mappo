"use strict"

const renderTile = require(`./renderTile`)

module.exports = ({
  context,
  tileset,
  tilesetImageBitmap,
  tilesetColumns,
}) => {
  for (let tileIndex = 0; tileIndex < tileset.numTiles; tileIndex++) {
    const tileX = tileIndex % tilesetColumns
    const tileY = ~~(tileIndex / tilesetColumns)

    renderTile({
      context,
      tileset,
      tilesetImageBitmap,
      tileIndex,
      x: tileX * tileset.tileWidth,
      y: tileY * tileset.tileHeight,
    })
  }
}
