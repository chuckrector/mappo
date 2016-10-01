"use strict"

const immutableArraySet = ({array, index, newValue}) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)]
}

const tileIndexGrid = (state=[], action) => {
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

const tileLayers = (state=[], action) => {
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

const map = (state={}, action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      return Object.assign({}, state, {
        tileLayers: tileLayers(state.tileLayers, action),
      })
    } break

    default: {
      return state
    }
  }
}

module.exports = {
  tileIndexGrid,
  tileLayers,
  map,
}
