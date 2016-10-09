"use strict"

const {List} = require(`immutable`)
const tileIndexGrid = require(`./tileIndexGrid`)

module.exports = (state=List(), action) => {
  switch (action.type) {
    case `PLOT_TILE`: {
      const tileLayer = state.get(action.tileLayerIndex)
      const newTileIndexGrid = tileIndexGrid(tileLayer.get(`tileIndexGrid`), action)
      const result = state.setIn([`${action.tileLayerIndex}`, `tileIndexGrid`], newTileIndexGrid)
      return result
    } break

    default: {
      return state
    }
  }
}


