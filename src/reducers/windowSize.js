"use strict"

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_WINDOW_SIZE`: {
      return {
        width: action.width,
        height: action.height,
      }
    } break

    default: {
      return state
    }
  }
}