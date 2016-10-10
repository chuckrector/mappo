"use strict"

const {HIGHLIGHT_MAP_TILE} = require(`../actions/index`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case HIGHLIGHT_MAP_TILE: {
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
