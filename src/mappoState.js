"use strict"

const cloneDeep = require(`lodash/clonedeep`)

const undo = []
let undoCursor = 0

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
      const overwrittenTileIndex = layer.tileIndexGrid[layerOffset]

      layer.tileIndexGrid = [
        ...layer.tileIndexGrid.slice(0, layerOffset),
        action.tileIndex,
        ...layer.tileIndexGrid.slice(layerOffset + 1),
      ]

      undo.push({
        originalAction: cloneDeep(action),
        overwrittenTileIndex,
      })
      undoCursor++

      return newState
    }

    case `UNDO`: {
      const undoInfo = undo[--undoCursor]
      const newState = cloneDeep(state)
      const layer = newState.map.tileLayers[undoInfo.originalAction.layerIndex]
      const layerOffset = (undoInfo.originalAction.y * layer.width) + undoInfo.originalAction.x

      layer.tileIndexGrid = [
        ...layer.tileIndexGrid.slice(0, layerOffset),
        undoInfo.overwrittenTileIndex,
        ...layer.tileIndexGrid.slice(layerOffset + 1),
      ]

      return newState
    } break

    default: {
      return state
    }
  }
}
