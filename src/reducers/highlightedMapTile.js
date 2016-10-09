"use strict"

module.exports = (state={}, action) => {
  switch (action.type) {
    case `HIGHLIGHT_MAP_TILE`: {
      return {
        tileX: action.tileX,
        tileY: action.tileY,
      }
    } break

    default: {
      return state
    }
  }
}
