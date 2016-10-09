"use strict"

const {combineReducers} = require(`redux`)
const zoomLevel = require(`./zoomLevel`)
const layerHidden = require(`./layerHidden`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)

module.exports = combineReducers({
  zoomLevel,
  layerHidden,
  selectedTileLayerIndex,
})
