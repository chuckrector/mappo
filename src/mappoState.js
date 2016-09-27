"use strict"

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_MAP`: {
      return {
        map: {
          tileLayers: action.tileLayers,
        }
      }
    } break
    default: {
      return state
    }
  }
}
