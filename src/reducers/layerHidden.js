"use strict"

const {List} = require(`immutable`)
const filler = require(`../filler`)
const {RESET_LAYER_VISIBILITIES} = require(`../actions/index`)

const initialState = List(filler(20, false))

module.exports = (state=initialState, action) => {
  switch (action.type) {
    case RESET_LAYER_VISIBILITIES: {
      return initialState
    } break

    case `TOGGLE_LAYER_VISIBILITY`: {
      return state.set(action.index, !state.get(action.index))
    } break

    default: {
      return state
    }
  }
}
