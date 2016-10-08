"use strict"

const immutableArraySet = require(`../immutableArraySet`)

module.exports = (state=[], action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {
        x,
        y,
        tileIndexToPlot,
        tileLayerIndex,
        tileLayers,
      } = action
      const layer = tileLayers[tileLayerIndex]
      const tileIndexGridOffset = (y * layer.width) + x
      const overwritingTileIndex = layer.tileIndexGrid[tileIndexGridOffset]
      return immutableArraySet({
        array: state,
        index: state.length,
        newValue: {
          x: action.x,
          y: action.y,
          tileIndexToPlot: action.tileIndexToPlot,
          tileLayerIndex: action.tileLayerIndex,
          overwritingTileIndex,
        },
      })
    } break

    default: {
      return state
    }
  }
}
