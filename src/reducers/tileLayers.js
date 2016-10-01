"use strict"

const immutableArraySet = require(`../immutableArraySet`)
const tileIndexGrid = require(`./tileIndexGrid`)

module.exports = (state=[], action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const tileLayer = state[action.tileLayerIndex]

      return immutableArraySet({
        array: state,
        index: action.tileLayerIndex,
        newValue: Object.assign({}, tileLayer, {
          tileIndexGrid: tileIndexGrid(tileLayer.tileIndexGrid, action),
        }),
      })
    } break

    default: {
      return state
    }
  }
}

