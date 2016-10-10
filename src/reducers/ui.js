"use strict"

const {combineReducers} = require(`redux`)
const zoomLevel = require(`./zoomLevel`)
const layerHidden = require(`./layerHidden`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)
const selectedTileIndex = require(`./selectedTileIndex`)
const highlightedMapTile = require(`./highlightedMapTile`)
const highlightedTilesetTile = require(`./highlightedTilesetTile`)
const isMapLoading = require(`./isMapLoading`)
const camera = require(`./camera`)
const windowSize = require(`./windowSize`)
const windowPosition = require(`./windowPosition`)

module.exports = combineReducers({
  zoomLevel,
  layerHidden,
  selectedTileLayerIndex,
  selectedTileIndex,
  highlightedMapTile,
  highlightedTilesetTile,
  isMapLoading,
  camera,
  windowSize,
  windowPosition,
})
