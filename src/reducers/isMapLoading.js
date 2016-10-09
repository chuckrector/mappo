"use strict"

module.exports = (state=false, action) => {
  switch (action.type) {
    case `SET_MAP_LOADING`: {
      return action.isMapLoading
    } break

    default: {
      return state
    }
  }
}
