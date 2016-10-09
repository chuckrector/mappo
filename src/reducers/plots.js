"use strict"

const {List, Map} = require(`immutable`)

module.exports = (state=List(), action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {
        x,
        y,
        tileIndexToPlot,
        tileLayerIndex,
        tileLayers,
      } = action
      const layer = tileLayers.get(tileLayerIndex)
      const tileIndexGridOffset = (y * layer.get(`width`)) + x
      const overwritingTileIndex = layer.get(`tileIndexGrid`).get(tileIndexGridOffset)
      return state.push(Map({
        x: action.x,
        y: action.y,
        v: action.tileIndexToPlot,
        l: action.tileLayerIndex,
        o: overwritingTileIndex,
      }))
    } break

    default: {
      return state
    }
  }
}
