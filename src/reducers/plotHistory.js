"use strict"

// adapted from redux undo's undoable()
// TODO(chuck): prolly doesn't need to be a reducer enhancer now?
module.exports = reducer => {
  const initialState = {
    plotHistory: [],
    undoIndex: 0, // always rests +1 latest plot
  }

  return (state=initialState, action) => {
    const {plotHistory, undoIndex} = state

    switch (action.type) {
      case `UNDO`: {
        return {
          plotHistory,
          undoIndex: undoIndex - 1,
        }
      } break

      case `REDO`: {
        return {
          plotHistory,
          undoIndex: undoIndex + 1,
        }
      } break

      default: {
        let newPlotHistory = plotHistory
        if (undoIndex < plotHistory.length) {
          newPlotHistory = plotHistory.slice(plotHistory, undoIndex)
        }

        newPlotHistory = reducer(newPlotHistory, action)
        if (newPlotHistory === plotHistory) {
          return state
        }

        return {
          plotHistory: newPlotHistory,
          undoIndex: undoIndex + 1,
        }
      }
    }
  }
}