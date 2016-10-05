"use strict"

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_EDITOR_WINDOW_SIZE`: {
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
      })
    } break

    default: {
      return state
    }
  }
}
