"use strict"

const immutableArraySet = require(`../immutableArraySet`)

module.exports = (state=[], action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {x, y, tileIndexToPlot, tileLayers, tileLayerIndex} = action
      const layer = tileLayers[tileLayerIndex]
      return immutableArraySet({
        array: state,
        index: (y * layer.width) + x,
        newValue: tileIndexToPlot,
      })
    } break

    default: {
      return state
    }
  }
}
