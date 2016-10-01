"use strict"

const tileLayers = require(`./tileLayers`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      return Object.assign({}, state, {
        tileLayers: tileLayers(state.tileLayers, action),
      })
    } break

    default: {
      return state
    }
  }
}
