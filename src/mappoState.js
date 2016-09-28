"use strict"

const cloneDeep = require(`lodash/clonedeep`)

module.exports = (state={}, action) => {
  const plotTile = ({tileIndexGrid, layerWidth, x, y, tileIndex, layerIndex}) => {
    const layerOffset = (y * layerWidth) + x
    const overwrittenTileIndex = tileIndexGrid[layerOffset]

    tileIndexGrid[layerOffset] = tileIndex

    addUndo({overwrittenTileIndex})

    const tileLayers = state.map.tileLayers
    const newTileLayers = [
      ...tileLayers.slice(0, layerIndex),
      Object.assign({}, tileLayers[layerIndex], {
        tileIndexGrid,
      }),
      ...tileLayers.slice(layerIndex + 1),
    ]

    return Object.assign({}, state, {
      map: Object.assign({}, state.map, {
        tileLayers: newTileLayers,
      })
    })
  }

  const addUndo = info => {
    if (!state.undo) {
      state.undo = []
      state.undoCursor = 0
    }

    const undoState = Object.assign({}, {originalAction: cloneDeep(action)}, info)
    state.undo.push(undoState)
    state.undoCursor++
  }

  switch (action.type) {
    case `SET_MAP`: {
      addUndo({prevMap: state.map})
      return Object.assign({}, state, {
        map: action.map,
      })
    } break

    case `PLOT_TILE`: {
      const layer = state.map.tileLayers[action.layerIndex]
      return plotTile({
        layerIndex: action.layerIndex,
        tileIndexGrid: layer.tileIndexGrid.slice(),
        layerWidth: layer.width,
        x: action.x,
        y: action.y,
        tileIndex: action.tileIndex,
      })
    }

    case `UNDO`: {
      const undoInfo = state.undo[--state.undoCursor]

      switch (undoInfo.originalAction.type) {
        case `SET_MAP`: {
          let map
          if (undoInfo.originalAction.prevMap) {
            map = undoInfo.originalAction.prevMap
          }
          return Object.assign({}, state, {map})
        } break

        case `PLOT_TILE`: {
          const layer = state.map.tileLayers[undoInfo.originalAction.layerIndex]
          return plotTile({
            layerIndex: undoInfo.originalAction.layerIndex,
            tileIndexGrid: layer.tileIndexGrid.slice(),
            layerWidth: layer.width,
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
