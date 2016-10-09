"use strict"

const {List} = require(`immutable`)

module.exports = (state=List(), action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {x, y, tileIndexToPlot, tileLayers, tileLayerIndex} = action
      const layer = tileLayers.get(tileLayerIndex)
      const result = state.set((y * layer.get(`width`)) + x, tileIndexToPlot)
      return result
    } break

    default: {
      return state
    }
  }
}
