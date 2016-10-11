"use strict"

const {combineReducers} = require(`redux`)
const zoomLevel = require(`./zoomLevel`)
const layerHidden = require(`./layerHidden`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)
const selectedTilesetTile = require(`./selectedTilesetTile`)
const highlightedMapTile = require(`./highlightedMapTile`)
const highlightedTilesetTile = require(`./highlightedTilesetTile`)
const isMapLoading = require(`./isMapLoading`)
const camera = require(`./camera`)

module.exports = combineReducers({
  zoomLevel,
  layerHidden,
  selectedTileLayerIndex,
  selectedTilesetTile,
  highlightedMapTile,
  highlightedTilesetTile,
  isMapLoading,
  camera,
})
