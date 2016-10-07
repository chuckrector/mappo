"use strict"

const renderTile = require(`./renderTile`)

module.exports = ({
  context,
  tileset,
  tilesetImageBitmap,
  tilesetColumns,
}) => {
  context.drawImage(tilesetImageBitmap, 0, 0)
}
