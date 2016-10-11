"use strict"

const loadMappoMap = require(`../loadMappoMap`)
const rebuildTilesetImageBitmap = require(`../rebuildTilesetImageBitmap`)
const {fromJS} = require(`immutable`)

const BUILT_TILESET_IMAGE_BITMAP = `BUILT_TILESET_IMAGE_BITMAP`
const HIGHLIGHT_MAP_TILE = `HIGHLIGHT_MAP_TILE`
const HOVER_TILESET_TILE = `HOVER_TILESET_TILE`
const LOAD_MAP = `LOAD_MAP`
const MOVE_CAMERA = `MOVE_CAMERA`
const PLOT_TILE = `PLOT_TILE`
const REDO = `REDO`
const RESET_LAYER_VISIBILITIES = `RESET_LAYER_VISIBILITIES`
const SELECT_LAYER = `SELECT_LAYER`
const SELECT_TILESET_TILE = `SELECT_TILESET_TILE`
const SET_MAP = `SET_MAP`
const SET_MAP_LOADING = `SET_MAP_LOADING`
const SET_WINDOW_POSITION = `SET_WINDOW_POSITION`
const SET_WINDOW_SIZE = `SET_WINDOW_SIZE`
const SET_ZOOM_LEVEL = `SET_ZOOM_LEVEL`
const TOGGLE_LAYER_VISIBILITY = `TOGGLE_LAYER_VISIBILITY`
const UNDO = `UNDO`

exports.BUILT_TILESET_IMAGE_BITMAP = BUILT_TILESET_IMAGE_BITMAP
exports.HIGHLIGHT_MAP_TILE = HIGHLIGHT_MAP_TILE
exports.HOVER_TILESET_TILE = HOVER_TILESET_TILE
exports.LOAD_MAP = LOAD_MAP
exports.MOVE_CAMERA = MOVE_CAMERA
exports.PLOT_TILE = PLOT_TILE
exports.REDO = REDO
exports.RESET_LAYER_VISIBILITIES = RESET_LAYER_VISIBILITIES
exports.SELECT_LAYER = SELECT_LAYER
exports.SELECT_TILESET_TILE = SELECT_TILESET_TILE
exports.SET_MAP = SET_MAP
exports.SET_MAP_LOADING = SET_MAP_LOADING
exports.SET_WINDOW_POSITION = SET_WINDOW_POSITION
exports.SET_WINDOW_SIZE = SET_WINDOW_SIZE
exports.SET_ZOOM_LEVEL = SET_ZOOM_LEVEL
exports.TOGGLE_LAYER_VISIBILITY = TOGGLE_LAYER_VISIBILITY
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

exports.hoverTilesetTile = where => {
  return {
    type: HOVER_TILESET_TILE,
    x: where.x,
    y: where.y,
    index: where.index,
  }
}

exports.loadMap = ({context, mapFilename}) => {
  return dispatch => {
    console.log(`loadMap`, context, mapFilename)
    dispatch(moveCamera({x: 0, y: 0}))
    dispatch(resetLayerVisibilities())
    dispatch(selectLayer(0))
    dispatch(selectTilesetTile(0))
    dispatch(highlightMapTile({x: 0, y: 0}))

    const map = loadMappoMap({context, mapFilename})
    return rebuildTilesetImageBitmap(map.tileset).then(tilesetImage => {
      // now that all the low-level image data conversion stuff is finished,
      // immutable.js-ify everything for the higher-level app
      dispatch(setMap(fromJS(map)))

      return tilesetImage
    })
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

exports.selectTilesetTile = where => {
  return {
    type: SELECT_TILESET_TILE,
    x: where.x,
    y: where.y,
    index: where.index,
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

exports.setWindowPosition = where => {
  return {
    type: SET_WINDOW_POSITION,
    x: where.x,
    y: where.y,
  }
}

exports.setWindowSize = size => {
  return {
    type: SET_WINDOW_SIZE,
    width: size.width,
    height: size.height,
  }
}

exports.setZoomLevel = zoomLevel => {
  return {
    type: SET_ZOOM_LEVEL,
    zoomLevel,
  }
}

exports.toggleLayerVisibility = index => {
  return {
    type: TOGGLE_LAYER_VISIBILITY,
    index,
  }
}

exports.undo = () => {
  return {
    type: UNDO,
  }
}
