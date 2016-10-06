"use strict"

const assert = require(`assert`)
const map = require(`./reducers/map`)
const editor = require(`./reducers/editor`)
const plots = require(`./reducers/plots`)
const immutableArraySet = require(`./immutableArraySet`)
const filler = require(`./filler`)
const undoable = require(`./undoable`)
const undoablePlots = undoable(plots)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `UNDO`: {
      const plotToUndo = state.plots.present.slice(-1)[0]
      // this will overwrite plotToUndo's tileIndexToPlot with its
      // overwritingTileIndex. it's fine that the old overwritingTileIndex
      // comes along for the ride, since PLOT_TILE in map reducer will ignore it
      const undoAction = Object.assign({}, plotToUndo, {
        type: `PLOT_TILE`,
        tileIndexToPlot: plotToUndo.overwritingTileIndex,
        tileLayers: state.map.tileLayers,
      })
      return Object.assign({}, state, {
        map: map(state.map, undoAction),
        plots: undoablePlots(state.plots, action),
        isMapDirty: true,
      })
    } break

    case `REDO`: {
      const plotToRedo = state.plots.future[0].slice(-1)[0]
      const redoAction = Object.assign({}, plotToRedo, {
        type: `PLOT_TILE`,
        tileLayers: state.map.tileLayers,
      })
      return Object.assign({}, state, {
        map: map(state.map, redoAction),
        plots: undoablePlots(state.plots, action),
        isMapDirty: true,
      })
    } break

    case `RELOAD_STORE`: {
      return Object.assign({}, state, action.state)
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

    case `SET_MAP_DIRTY`: {
      return Object.assign({}, state, {
        isMapDirty: action.isMapDirty,
      })
    } break

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
        map: map(state.map, action),
        plots: undoablePlots(state.plots, action),
        isMapDirty: true,
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
        isMapDirty: true,
      })
    } break

    case `SET_ZOOM`: {
      return Object.assign({}, state, {
        zoom: action.zoom,
      })
    } break

    default: {
      return state
    }
  }
}
