"use strict"

const assert = require(`assert`)
const map = require(`./reducers/map`)
const editor = require(`./reducers/editor`)
const immutableArraySet = require(`./immutableArraySet`)
const filler = require(`./filler`)
const undoable = require(`./undoable`)
const undoableMap = undoable(map)
const loadMappoConfig = require(`./loadMappoConfig`)

const mappoConfigFromDisk = loadMappoConfig()
// TODO(chuck): how to handle this more naturally? with no special priming
if (mappoConfigFromDisk.map) {
  mappoConfigFromDisk.isDirtyTilesetImageBitmap = true
}

module.exports = (state=mappoConfigFromDisk, action) => {
  switch (action.type) {
    case `UNDO`:
    case `REDO`: {
      return Object.assign({}, state, {
        map: undoableMap(state.map, action),
      })
    } break

    case `SET_LOADING`: {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      })
    } break

    case `SET_EDITOR_WINDOW_SIZE`: {
      return Object.assign({}, state, {
        editor: editor(state.editor, action),
      })
    } break

    case `SET_MAP`: {
      return Object.assign({}, state, {
        map: {
          past: [],
          present: action.map,
          future: [],
        },
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
        map: undoableMap(state.map, action)
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
