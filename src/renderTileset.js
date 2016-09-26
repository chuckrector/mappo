"use strict"

module.exports = ({
  context,
  tileset,
  tilesetColumns,
}) => {
  for (let tileIndex = 0; tileIndex < tileset.numTiles; tileIndex++) {
    const tileX = tileIndex % tilesetColumns
    const tileY = ~~(tileIndex / tilesetColumns)

    renderTile({
      context,
      tileset,
      tileIndex,
      x: tileX * tileset.tileWidth,
      y: tileY * tileset.tileHeight,
    })
  }
}
