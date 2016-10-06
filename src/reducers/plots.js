"use strict"

const immutableArraySet = require(`../immutableArraySet`)

module.exports = (state=[], action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {
        x,
        y,
        tileIndexToPlot,
        tileIndexGridWidth,
        layerIndex,
        tileLayers,
      } = action
      const layer = tileLayers[layerIndex]
      const tileIndexGridOffset = (y * tileIndexGridWidth) + x
      const overwritingTileIndex = layer.tileIndexGrid[tileIndexGridOffset]
      return immutableArraySet({
        array: state,
        index: state.length,
        newValue: {
          x: action.x,
          y: action.y,
          tileIndexToPlot: action.tileIndexToPlot,
          layerIndex: action.layerIndex,
          tileIndexGridWidth: action.tileIndexGridWidth,
          overwritingTileIndex,
        },
      })
    } break

    default: {
      return state
    }
  }
}
