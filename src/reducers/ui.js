"use strict"

const zoomLevel = require(`./zoomLevel`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_ZOOM_LEVEL`: {
      return Object.assign({}, state, {
        zoomLevel: zoomLevel(state.zoomLevel, action),
      })
    } break

    default: {
      return state
    }
  }
}