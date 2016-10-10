"use strict"

const {SET_WINDOW_SIZE} = require(`../actions/index`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case SET_WINDOW_SIZE: {
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