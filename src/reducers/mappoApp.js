"use strict"

const map = require(`./map`)
const plots = require(`./plots`)
const plotHistory = require(`./plotHistory`)
const undoablePlots = plotHistory(plots)
const ui = require(`./ui`)
const {plotTile} = require(`../actions/index`)

module.exports = (state={}, action) => {
  let newState = state

  switch (action.type) {
    case `UNDO`: {
      const plots = state.plots
      const plotHistory = plots.get(`plotHistory`)
      const undoIndex = plots.get(`undoIndex`)
      const plotToUndo = plotHistory.get(undoIndex - 1)
      const undoAction = plotTile({
        x: plotToUndo.get(`x`),
        y: plotToUndo.get(`y`),
        tileIndexToPlot: plotToUndo.get(`o`),
        tileLayerIndex: plotToUndo.get(`l`),
        tileLayers: state.map.get(`tileLayers`),
      })
      newState = Object.assign({}, state, {
        map: map(state.map, undoAction),
      })
    } break

    case `REDO`: {
      const plots = state.plots
      const plotHistory = plots.get(`plotHistory`)
      const undoIndex = plots.get(`undoIndex`)
      const plotToRedo = plotHistory.get(undoIndex)
      const redoAction = plotTile({
        x: plotToRedo.get(`x`),
        y: plotToRedo.get(`y`),
        tileIndexToPlot: plotToRedo.get(`v`),
        tileLayerIndex: plotToRedo.get(`l`),
        tileLayers: state.map.get(`tileLayers`),
      })
      newState = Object.assign({}, state, {
        map: map(state.map, redoAction),
      })
    } break

    case `SET_MAP`: {
      newState = Object.assign({}, state, {
        map: action.map,
      })
    } break

    case `PLOT_TILE`: {
      newState = Object.assign({}, state, {
        map: map(state.map, action),
      })
    } break

    default: {
      newState = Object.assign({}, state, {
        ui: ui(state.ui, action),
      })
    }
  }

  // TODO(chuck): this crazy 💩 will all go away once i reach combineReducers()
  if (
    action.type === `UNDO` ||
    action.type === `REDO` ||
    action.type === `PLOT_TILE`
  ) {
    newState = Object.assign({}, newState, {
      plots: undoablePlots(newState.plots, action),
    })
  }

  return newState
}
