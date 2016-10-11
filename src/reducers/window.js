"use strict"

const {SET_WINDOW_SIZE} = require(`../actions/index`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_WINDOW_POSITION`: {
      return Object.assign({}, state, {
        x: action.x,
        y: action.y,
      })
    } break

    case SET_WINDOW_SIZE: {
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
