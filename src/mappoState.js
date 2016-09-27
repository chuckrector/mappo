"use strict"

const cloneDeep = require(`lodash/clonedeep`)

module.exports = (state={}, action) => {
  const newState = cloneDeep(state)

  const addUndo = info => {
    if (!newState.undo) {
      newState.undo = []
      newState.undoCursor = 0
    }

    const undoState = Object.assign({}, {originalAction: cloneDeep(action)}, info)
    newState.undo.push(undoState)
    newState.undoCursor++
  }

  switch (action.type) {
    case `SET_MAP`: {
      const prevMap = newState.map

      newState.map = {tileLayers: action.tileLayers}

      addUndo({prevMap})

      return newState
    } break

    case `PLOT_TILE`: {
      const layer = newState.map.tileLayers[action.layerIndex]
      const layerOffset = (action.y * layer.width) + action.x
      const overwrittenTileIndex = layer.tileIndexGrid[layerOffset]

      layer.tileIndexGrid = [
        ...layer.tileIndexGrid.slice(0, layerOffset),
        action.tileIndex,
        ...layer.tileIndexGrid.slice(layerOffset + 1),
      ]

      addUndo({overwrittenTileIndex})

      return newState
    }

    case `UNDO`: {
      const undoInfo = state.undo[--state.undoCursor]

      switch (undoInfo.originalAction.type) {
        case `SET_MAP`: {
          if (undoInfo.prevMap) {
            newState.map = undoInfo.prevMap
          } else {
            delete newState.map
          }
        } break

        case `PLOT_TILE`: {
          const layer = newState.map.tileLayers[undoInfo.originalAction.layerIndex]
          const layerOffset = (undoInfo.originalAction.y * layer.width) + undoInfo.originalAction.x
          layer.tileIndexGrid = [
            ...layer.tileIndexGrid.slice(0, layerOffset),
            undoInfo.overwrittenTileIndex,
            ...layer.tileIndexGrid.slice(layerOffset + 1),
          ]
        } break
      }

      return newState
    } break

    default: {
      return state
    }
  }
}
