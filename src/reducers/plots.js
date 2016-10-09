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
      const overwritingTileIndex = layer.tileIndexGrid.get(tileIndexGridOffset)
      return immutableArraySet({
        array: state,
        index: state.length,
        newValue: {
          x: action.x,
          y: action.y,
          v: action.tileIndexToPlot,
          l: action.tileLayerIndex,
          o: overwritingTileIndex,
        },
      })
    } break

    default: {
      return state
    }
  }
}
