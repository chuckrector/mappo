"use strict"

const BUILT_TILESET_IMAGE_BITMAP = `BUILT_TILESET_IMAGE_BITMAP`
const PLOT_TILE = `PLOT_TILE`

exports.BUILT_TILESET_IMAGE_BITMAP = BUILT_TILESET_IMAGE_BITMAP
exports.PLOT_TILE = PLOT_TILE

exports.buildTilesetImageBitmap = () => {
  return {
    type: BUILT_TILESETIMAGE_BITMAP
  }
}

exports.plotTile = (where) => {
  return {
    type: PLOT_TILE,
    tileLayerIndex: where.tileLayerIndex,
    tileLayers: where.tileLayers,
    tileIndexToPlot: where.tileIndexToPlot,
    x: where.x,
    y: where.y,
  }
}

