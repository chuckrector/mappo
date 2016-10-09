"use strict"

const initialState = {
  x: 0,
  y: 0,
}

module.exports = (state=initialState, action) => {
  switch (action.type) {
    case `MOVE_CAMERA`: {
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
