"use strict"

const ZOOM_LEVELS = require(`./zoomLevels`)
const DEFAULT_ZOOM_LEVEL = require(`./defaultZoomLevel`)
const clamp = require(`lodash/clamp`)
const {SET_ZOOM_LEVEL} = require(`../actions/index`)

module.exports = (state=DEFAULT_ZOOM_LEVEL, action) => {
  switch (action.type) {
    case SET_ZOOM_LEVEL: {
      return clamp(action.zoomLevel, 0, ZOOM_LEVELS.length - 1)
    } break

    default: {
      return state
    }
  }
}
