"use strict"

const {SAVE_RECENT_MAP_FILENAME} = require(`../actions/index`)

module.exports = (state=``, action) => {
  switch (action.type) {
    case SAVE_RECENT_MAP_FILENAME: {
      return action.recentMapFilename
    } break

    default: {
      return state
    }
  }
}
