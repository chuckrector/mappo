"use strict"

const assert = require(`assert`)
const map = require(`./map`)
const editor = require(`./editor`)
const plots = require(`./plots`)
const plotHistory = require(`./plotHistory`)
const immutableArraySet = require(`../immutableArraySet`)
const filler = require(`../filler`)
const undoablePlots = plotHistory(plots)
const ui = require(`./ui`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `UNDO`: {
      const {plotHistory, undoIndex} = state.plots
      const plotToUndo = plotHistory[undoIndex - 1]
      const undoAction = Object.assign({}, plotToUndo, {
        type: `PLOT_TILE`,
        tileIndexToPlot: plotToUndo.o,
        tileLayerIndex: plotToUndo.l,
        tileLayers: state.map.tileLayers,
      })
      return Object.assign({}, state, {
        map: map(state.map, undoAction),
        plots: undoablePlots(state.plots, action),
        isMapDirty: true,
      })
    } break

    case `REDO`: {
      const {plotHistory, undoIndex} = state.plots
      const plotToRedo = plotHistory[undoIndex]
      const redoAction = Object.assign({}, plotToRedo, {
        type: `PLOT_TILE`,
        tileLayers: state.map.tileLayers,
        tileIndexToPlot: plotToRedo.v,
        tileLayerIndex: plotToRedo.l,
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

    case `PLOT_TILE`: {
      return Object.assign({}, state, {
        map: map(state.map, action),
        plots: undoablePlots(state.plots, action),
        isMapDirty: true,
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

    default: {
      return Object.assign({}, state, {
        ui: ui(state.ui, action),
      })
    }
  }
}
