"use strict"

const {HOVER_TILESET_TILE} = require(`../actions/index`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case HOVER_TILESET_TILE: {
      return {
        x: action.x,
        y: action.y,
        index: action.index,
      }
    } break

    default: {
      return state
    }
  }
}
