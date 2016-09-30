"use strict"

const cloneDeep = require(`lodash/clonedeep`)
const assert = require(`assert`)

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

    case `PLOT_GROUP_BEGIN`:
    case `PLOT_GROUP_END`: {
      addUndo(action)
      return state
    } break

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

        case `PLOT_GROUP_END`: {
          // seek backward to start of group
          while (state.undo[state.undoCursor].originalAction.type !== `PLOT_GROUP_BEGIN`) {
            state.undoCursor--
          }
          // we keep reassigning state below, so save this for after
          const savedUndoTail = state.undoCursor

          let groupCursor = state.undoCursor + 1
          while (state.undo[groupCursor].originalAction.type === `PLOT_TILE`) {
            const currentUndoInfo = state.undo[groupCursor]
            const currentLayer = state.map.tileLayers[currentUndoInfo.originalAction.layerIndex]
            state = plotTile({
              layerIndex: currentUndoInfo.originalAction.layerIndex,
              tileIndexGrid: currentLayer.tileIndexGrid.slice(),
              layerWidth: currentLayer.width,
              x: currentUndoInfo.originalAction.x,
              y: currentUndoInfo.originalAction.y,
              tileIndex: currentUndoInfo.overwrittenTileIndex,
            })
            groupCursor++
          }
          assert.equal(state.undo[groupCursor].type, `PLOT_GROUP_END`)
          // state is repeatedly reset above, so reset tail to save spot
          state.undoCursor = savedUndoTail
          return state
        } break
      }

      return newState
    } break

    default: {
      return state
    }
  }
}
