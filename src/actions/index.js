"use strict"

const BUILT_TILESET_IMAGE_BITMAP = `BUILT_TILESET_IMAGE_BITMAP`
const MOVE_CAMERA = `MOVE_CAMERA`
const PLOT_TILE = `PLOT_TILE`
const RESET_LAYER_VISIBILITIES = `RESET_LAYER_VISIBILITIES`
const SELECT_LAYER = `SELECT_LAYER`
const SET_MAP = `SET_MAP`
const SET_MAP_LOADING = `SET_MAP_LOADING`
const SET_ZOOM_LEVEL = `SET_ZOOM_LEVEL`

exports.BUILT_TILESET_IMAGE_BITMAP = BUILT_TILESET_IMAGE_BITMAP
exports.MOVE_CAMERA = MOVE_CAMERA
exports.PLOT_TILE = PLOT_TILE
exports.RESET_LAYER_VISIBILITIES = RESET_LAYER_VISIBILITIES
exports.SELECT_LAYER = SELECT_LAYER
exports.SET_MAP = SET_MAP
exports.SET_MAP_LOADING = SET_MAP_LOADING
exports.SET_ZOOM_LEVEL = SET_ZOOM_LEVEL

exports.builtTilesetImageBitmap = () => {
  return {
    type: BUILT_TILESET_IMAGE_BITMAP
  }
}

exports.moveCamera = where => {
  return {
    type: MOVE_CAMERA,
    x: where.x,
    y: where.y,
  }
}

exports.plotTile = where => {
  return {
    type: PLOT_TILE,
    tileLayerIndex: where.tileLayerIndex,
    tileLayers: where.tileLayers,
    tileIndexToPlot: where.tileIndexToPlot,
    x: where.x,
    y: where.y,
  }
}

exports.resetLayerVisibilities = () => {
  return {
    type: RESET_LAYER_VISIBILITIES,
  }
}

exports.selectLayer = index => {
  return {
    type: SELECT_LAYER,
    index,
  }
}

exports.setMap = map => {
  return {
    type: SET_MAP,
    map,
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
