"use strict"

const {combineReducers} = require(`redux`)
const zoomLevel = require(`./zoomLevel`)
const layerHidden = require(`./layerHidden`)

module.exports = combineReducers({
  zoomLevel,
  layerHidden,
})
