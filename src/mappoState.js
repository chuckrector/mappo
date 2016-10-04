"use strict"

const assert = require(`assert`)
const map = require(`./reducers/map`)
const immutableArraySet = require(`./immutableArraySet`)
const filler = require(`./filler`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_MAP`: {
      return Object.assign({}, state, {
        map: action.map,
        isDirtyTilesetImageBitmap: true,
      })
    } break

    case `BUILT_TILESET_IMAGE_BITMAP`: {
      return Object.assign({}, state, {
        isDirtyTilesetImageBitmap: false,
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

    case `TOGGLE_LAYER_VISIBILITY`: {
      let layerHidden = state.layerHidden
      if (!layerHidden) {
        layerHidden = filler(20)
      }
      let isHidden = !layerHidden[action.index]
      return Object.assign({}, state, {
        layerHidden: immutableArraySet({
          array: layerHidden,
          index: action.index,
          newValue: isHidden,
        })
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
