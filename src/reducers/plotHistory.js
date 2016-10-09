"use strict"

const {fromJS, List, Map} = require(`immutable`)

// adapted from redux undo's undoable()
// TODO(chuck): prolly doesn't need to be a reducer enhancer now?
module.exports = reducer => {
  const initialState = fromJS({
    plotHistory: [],
    undoIndex: 0, // always rests +1 latest plot
  })

  return (state=initialState, action) => {
    const plotHistory = state.get(`plotHistory`)
    const undoIndex = state.get(`undoIndex`)

    switch (action.type) {
      case `UNDO`: {
        return Map({
          plotHistory,
          undoIndex: undoIndex - 1,
        })
      } break

      case `REDO`: {
        return Map({
          plotHistory,
          undoIndex: undoIndex + 1,
        })
      } break

      default: {
        let newPlotHistory = plotHistory
        if (undoIndex < plotHistory.size) {
          newPlotHistory = plotHistory.slice(plotHistory, undoIndex)
        }

        newPlotHistory = reducer(newPlotHistory, action)
        if (newPlotHistory === plotHistory) {
          return state
        }

        return Map({
          plotHistory: newPlotHistory,
          undoIndex: undoIndex + 1,
        })
      }
    }
  }
}