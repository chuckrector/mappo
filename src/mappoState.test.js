"use strict"

const expect = require(`expect`)
const deepFreeze = require(`deep-freeze`)
const filler = require(`./filler`)
const createStore = require(`./createStore`)
const mappoState = require(`./mappoState`)

{
  // can set map
  const store = createStore(mappoState)
  expect(store.getState()).toEqual({undo: []})

  store.dispatch({type: `SET_MAP`, map: {tileLayers: []}})
  expect(store.getState().map).toEqual({tileLayers: []})
}

{
  // SET_MAP holds a direct reference to the map
  const store = createStore(mappoState)
  expect(store.getState()).toEqual({undo: []})

  const map = {tileLayers: []}
  store.dispatch({type: `SET_MAP`, map})
  expect(store.getState().map).toBe(map)
}

{
  // can plot a tile
  const store = createStore(mappoState)

  const tileLayers = [{width: 2, height: 2, tileIndexGrid: filler(2 * 2, 0)}]
  deepFreeze(tileLayers)
  store.dispatch({type: `SET_MAP`, map: {tileLayers}})
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual(filler(2 * 2, 0))

  store.dispatch({type: `PLOT_TILE`, x: 0, y: 1, tileIndexGridWidth: 2, tileLayerIndex: 0, tileIndexToPlot: 99})
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual([0, 0, 99, 0])
}
