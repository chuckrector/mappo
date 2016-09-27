"use strict"

const cloneDeep = require(`lodash/clonedeep`)

const plotTile = ({map, layerIndex, x, y, tileIndex}) => {
  const layer = map.tileLayers[layerIndex]
  const layerOffset = (y * layer.width) + x
  const overwrittenTileIndex = layer.tileIndexGrid[layerOffset]

  layer.tileIndexGrid = [
    ...layer.tileIndexGrid.slice(0, layerOffset),
    tileIndex,
    ...layer.tileIndexGrid.slice(layerOffset + 1),
  ]

  return overwrittenTileIndex
}

module.exports = (state={}, action) => {
  const newState = state

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

      newState.map = action.map

      addUndo({prevMap})

      return newState
    } break

    case `PLOT_TILE`: {
      const overwrittenTileIndex = plotTile({
        map: newState.map,
        layerIndex: action.layerIndex,
        x: action.x,
        y: action.y,
        tileIndex: action.tileIndex,
      })

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
          plotTile({
            map: newState.map,
            layerIndex: undoInfo.originalAction.layerIndex,
            x: undoInfo.originalAction.x,
            y: undoInfo.originalAction.y,
            tileIndex: undoInfo.overwrittenTileIndex,
          })
        } break
      }

      return newState
    } break

    default: {
      return state
    }
  }
}
