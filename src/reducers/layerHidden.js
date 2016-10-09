"use strict"

const filler = require(`../filler`)

const initialState = filler(20, false)
const immutableArraySet = require(`../immutableArraySet`)

module.exports = (state=initialState, action) => {
  switch (action.type) {
    case `RESET_LAYER_VISIBILITIES`: {
      return initialState
    } break

    case `TOGGLE_LAYER_VISIBILITY`: {
      return immutableArraySet({
        array: state,
        index: action.index,
        newValue: !state[action.index],
      })
    } break

    default: {
      return state
    }
  }
}
