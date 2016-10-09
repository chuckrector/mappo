"use strict"

const expect = require(`expect`)
const deepFreeze = require(`deep-freeze`)
const filler = require(`../filler`)
const {createStore} = require(`redux`)
const mappoApp = require(`./mappoApp`)

{
  // can set map
  const store = createStore(mappoApp)

  store.dispatch({type: `SET_MAP`, map: {tileLayers: []}})
  expect(store.getState().map).toEqual({tileLayers: []})
}

{
  // setting map marks tileset image bitmap as needing rebuilt
  const store = createStore(mappoApp)

  expect(store.getState().isDirtyTilesetImageBitmap).toBe(undefined)
  store.dispatch({type: `SET_MAP`, map: {tileLayers: []}})
  expect(store.getState().isDirtyTilesetImageBitmap).toBe(true)
}

{
  // can mark tileset image bitmap as built
  const store = createStore(mappoApp)

  store.dispatch({type: `SET_MAP`, map: {}})
  store.dispatch({type: `BUILT_TILESET_IMAGE_BITMAP`})
  expect(store.getState().isDirtyTilesetImageBitmap).toBe(false)
}

{
  // SET_MAP holds a direct reference to the map
  const store = createStore(mappoApp)

  const map = {tileLayers: []}
  store.dispatch({type: `SET_MAP`, map})
  expect(store.getState().map).toBe(map)
}

{
  // can plot a tile
  const store = createStore(mappoApp)

  const tileLayers = [{width: 2, height: 2, tileIndexGrid: filler(2 * 2, 77)}]
  deepFreeze(tileLayers)
  store.dispatch({type: `SET_MAP`, map: {tileLayers}})
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual(filler(2 * 2, 77))

  const plotInfo = {
    x: 0,
    y: 1,
    tileLayerIndex: 0,
    tileLayers,
    tileIndexToPlot: 99,
  }
  store.dispatch(Object.assign({type: `PLOT_TILE`}, plotInfo))
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual([77, 77, 99, 77])
  const {plotHistory, undoIndex} = store.getState().plots
  expect(plotHistory[undoIndex - 1]).toEqual({
    x: 0,
    y: 1,
    l: 0,
    v: 99,
    o: 77,
  })
  expect(store.getState().isMapDirty).toBe(true)
}

{
  // can set editor window size
  const store = createStore(mappoApp)

  store.dispatch({type: `SET_EDITOR_WINDOW_SIZE`, width: 200, height: 300})
  expect(store.getState().editor.width).toEqual(200)
  expect(store.getState().editor.height).toEqual(300)
}

{
  // can load state
  const store = createStore(mappoApp)

  store.dispatch({type: `RELOAD_STORE`, state: {herp: `derp`}})
  expect(store.getState().herp).toEqual(`derp`)
}

{
  // can set map dirty state
  const store = createStore(mappoApp)

  store.dispatch({type: `SET_MAP_DIRTY`, isMapDirty: true})
  expect(store.getState().isMapDirty).toEqual(true)

  store.dispatch({type: `SET_MAP_DIRTY`, isMapDirty: false})
  expect(store.getState().isMapDirty).toEqual(false)
}

