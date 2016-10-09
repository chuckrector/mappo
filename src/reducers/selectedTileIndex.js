"use strict"

module.exports = (state=0, action) => {
  switch (action.type) {
    case `SELECT_TILESET_TILE`: {
      return action.index
    } break

    default: {
      return state
    }
  }
}
