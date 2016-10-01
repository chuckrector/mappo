"use strict"

const cloneDeep = require(`lodash/clonedeep`)
const assert = require(`assert`)
const map = require(`./reducers/map`)

module.exports = (state={}, action) => {
  const plotTile = ({tileIndexGrid, layerWidth, x, y, tileIndex, layerIndex}) => {
    const layerOffset = (y * layerWidth) + x
    const overwrittenTileIndex = tileIndexGrid[layerOffset]

    tileIndexGrid[layerOffset] = tileIndex

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

  switch (action.type) {
    case `SET_MAP`: {
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

    default: {
      return state
    }
  }
}
