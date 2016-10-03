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
        selectedTileLayerIndex: action.index,
      })
    } break

    case `SELECT_TILESET_TILE`: {
      return Object.assign({}, state, {
        selectedTileIndex: action.index,
      })
    } break

    case `PLOT_TILE`: {
      return Object.assign({}, state, {
        map: map(state.map, action)
      })
    } break

    case `HIGHLIGHT_MAP_TILE`: {
      return Object.assign({}, state, {
        highlightedMapTile: {
          x: action.x,
          y: action.y,
        },
      })
    } break

    case `MOVE_CAMERA`: {
      return Object.assign({}, state, {
        camera: {
          x: action.x,
          y: action.y,
        },
      })
    } break

    default: {
      return state
    }
  }
}
