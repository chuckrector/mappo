"use strict"

const PLOT_TILE = `PLOT_TILE`

exports.PLOT_TILE = PLOT_TILE

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
