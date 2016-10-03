"use strict"

const immutableArraySet = require(`../immutableArraySet`)

module.exports = (state=[], action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const {x, y, tileIndexToPlot, tileIndexGridWidth} = action
      return immutableArraySet({
        array: state,
        index: (y * tileIndexGridWidth) + x,
        newValue: tileIndexToPlot,
      })
    } break

    default: {
      return state
    }
  }
}