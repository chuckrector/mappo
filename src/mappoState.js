"use strict"

const cloneDeep = require(`lodash/clonedeep`)

module.exports = (state={}, action) => {
  switch (action.type) {
    case `SET_MAP`: {
      return {
        map: {
          tileLayers: action.tileLayers,
        }
      }
    } break

    case `PLOT_TILE`: {
      const newState = cloneDeep(state)
      const layer = newState.map.tileLayers[action.layerIndex]
      const layerOffset = (action.y * layer.width) + action.x

      layer.tileIndexGrid = [
        ...layer.tileIndexGrid.slice(0, layerOffset),
        action.tileIndex,
        ...layer.tileIndexGrid.slice(layerOffset + 1),
      ]

      return newState
    }

    default: {
      return state
    }
  }
}
