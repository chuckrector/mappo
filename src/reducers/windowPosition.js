"use strict"

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_WINDOW_POSITION`: {
      return {
        x: action.x,
        y: action.y,
      }
    } break

    default: {
      return state
    }
  }
}