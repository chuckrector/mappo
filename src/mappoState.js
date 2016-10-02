"use strict"

const assert = require(`assert`)
const map = require(`./reducers/map`)

module.exports = (state={undo: []}, action) => {
  switch (action.type) {
    case `SET_MAP`: {
      return Object.assign({}, state, {
        map: action.map,
      })
    } break

    case `SELECT_LAYER`: {
      return Object.assign({}, state, {
        selectedMapLayerIndex: action.index,
      })
    } break

    case `SELECT_TILE`: {
      return Object.assign({}, state, {
        selectedTileIndex: action.index,
      })
    } break

    case `PLOT_TILE`: {
      return Object.assign({}, state, {
        map: map(state.map, action)
      })
    } break

    default: {
      return state
    }
  }
}
