"use strict"

const {combineReducers} = require(`redux`)
const zoomLevel = require(`./zoomLevel`)
const layerHidden = require(`./layerHidden`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)
const selectedTileIndex = require(`./selectedTileIndex`)
const highlightedMapTile = require(`./highlightedMapTile`)

module.exports = combineReducers({
  zoomLevel,
  layerHidden,
  selectedTileLayerIndex,
  selectedTileIndex,
  highlightedMapTile,
})
