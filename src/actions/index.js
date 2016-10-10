"use strict"

const BUILT_TILESET_IMAGE_BITMAP = `BUILT_TILESET_IMAGE_BITMAP`
const HIGHLIGHT_MAP_TILE = `HIGHLIGHT_MAP_TILE`
const MOVE_CAMERA = `MOVE_CAMERA`
const PLOT_TILE = `PLOT_TILE`
const REDO = `REDO`
const RESET_LAYER_VISIBILITIES = `RESET_LAYER_VISIBILITIES`
const SELECT_LAYER = `SELECT_LAYER`
const SELECT_TILESET_TILE = `SELECT_TILESET_TILE`
const SET_MAP = `SET_MAP`
const SET_MAP_LOADING = `SET_MAP_LOADING`
const SET_ZOOM_LEVEL = `SET_ZOOM_LEVEL`
const UNDO = `UNDO`

exports.BUILT_TILESET_IMAGE_BITMAP = BUILT_TILESET_IMAGE_BITMAP
exports.HIGHLIGHT_MAP_TILE = HIGHLIGHT_MAP_TILE
exports.MOVE_CAMERA = MOVE_CAMERA
exports.PLOT_TILE = PLOT_TILE
exports.REDO = REDO
exports.RESET_LAYER_VISIBILITIES = RESET_LAYER_VISIBILITIES
exports.SELECT_LAYER = SELECT_LAYER
exports.SELECT_TILESET_TILE = SELECT_TILESET_TILE
exports.SET_MAP = SET_MAP
exports.SET_MAP_LOADING = SET_MAP_LOADING
exports.SET_ZOOM_LEVEL = SET_ZOOM_LEVEL
exports.UNDO = UNDO

exports.builtTilesetImageBitmap = () => {
  return {
    type: BUILT_TILESET_IMAGE_BITMAP
  }
}

exports.highlightMapTile = where => {
  return {
    type: HIGHLIGHT_MAP_TILE,
    x: where.x,
    y: where.y,
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

exports.redo = () => {
  return {
    type: REDO,
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

exports.selectTilesetTile = index => {
  return {
    type: SELECT_TILESET_TILE,
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

exports.undo = () => {
  return {
    type: UNDO,
  }
}
