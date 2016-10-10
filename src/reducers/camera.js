"use strict"

const {Map} = require(`immutable`)
const {MOVE_CAMERA} = require(`../actions/index`)

const initialState = Map({
  x: 0,
  y: 0,
})

module.exports = (state=initialState, action) => {
  switch (action.type) {
    case MOVE_CAMERA: {
      return Map({
        x: action.x,
        y: action.y,
      })
    } break

    default: {
      return state
    }
  }
}
