"use strict"

// adapted from redux undo's undoable()
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
        let newplotHistory = plotHistory
        if (undoIndex < plotHistory.length) {
          newplotHistory = plotHistory.slice(plotHistory, undoIndex)
        }

        newplotHistory = reducer(newplotHistory, action)
        if (newplotHistory === plotHistory) {
          return state
        }

        return {
          plotHistory: newplotHistory,
          undoIndex: undoIndex + 1,
        }
      }
    }
  }
}