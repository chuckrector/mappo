"use strict"

module.exports = (state=0, action) => {
  switch (action.type) {
    case `SELECT_LAYER`: {
      return action.index
    } break

    default: {
      return state
    }
  }
}
