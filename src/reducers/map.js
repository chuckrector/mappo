"use strict"

const {Map} = require(`immutable`)
const tileLayers = require(`./tileLayers`)
const {PLOT_TILE} = require(`../actions/index`)

module.exports = (state=Map({}), action) => {
  switch (action.type) {
    case `SET_MAP`: {
      return action.map
    } break

    case PLOT_TILE: {
      const newTileLayers = tileLayers(state.get(`tileLayers`), action)
      const result = state.set(`tileLayers`, newTileLayers)
      return result
    } break

    default: {
      return state
    }
  }
}
