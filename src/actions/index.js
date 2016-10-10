"use strict"

const BUILT_TILESET_IMAGE_BITMAP = `BUILT_TILESET_IMAGE_BITMAP`
const PLOT_TILE = `PLOT_TILE`
const SET_MAP_LOADING = `SET_MAP_LOADING`
const SET_ZOOM_LEVEL = `SET_ZOOM_LEVEL`

exports.BUILT_TILESET_IMAGE_BITMAP = BUILT_TILESET_IMAGE_BITMAP
exports.PLOT_TILE = PLOT_TILE
exports.SET_MAP_LOADING = SET_MAP_LOADING
exports.SET_ZOOM_LEVEL = SET_ZOOM_LEVEL

exports.builtTilesetImageBitmap = () => {
  return {
    type: BUILT_TILESET_IMAGE_BITMAP
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

exports.setMapLoading = flag => {
  return {
    type: SET_MAP_LOADING,
    isMapLoading: flag,
  }
}

exports.setZoomLevel = zoomLevel => {
  return {
    type: SET_ZOOM_LEVEL,
    zoomLevel,
  }
}
