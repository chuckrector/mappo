"use strict"

const {List} = require(`immutable`)

module.exports = (state=List(), action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {x, y, tileIndexToPlot, tileLayers, tileLayerIndex} = action
      const layer = tileLayers[tileLayerIndex]
      return state.set((y * layer.width) + x, tileIndexToPlot)
    } break

    default: {
      return state
    }
  }
}
