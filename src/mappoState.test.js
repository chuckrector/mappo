"use strict"

const expect = require(`expect`)
const deepFreeze = require(`deep-freeze`)
const filler = require(`./filler`)
const createStore = require(`./createStore`)
const mappoState = require(`./mappoState`)

{
  // can set map
  const store = createStore(mappoState)
  expect(store.getState()).toEqual({})

  store.dispatch({type: `SET_MAP`, map: {tileLayers: []}})
  expect(store.getState().map).toEqual({tileLayers: []})
}

{
  // setting map marks tileset image bitmap as needing rebuilt
  const store = createStore(mappoState)

  expect(store.getState().isDirtyTilesetImageBitmap).toBe(undefined)
  store.dispatch({type: `SET_MAP`, map: {tileLayers: []}})
  expect(store.getState().isDirtyTilesetImageBitmap).toBe(true)
}

{
  // can mark tileset image bitmap as built
  const store = createStore(mappoState)

  store.dispatch({type: `SET_MAP`, map: {}})
  store.dispatch({type: `BUILT_TILESET_IMAGE_BITMAP`})
  expect(store.getState().isDirtyTilesetImageBitmap).toBe(false)
}

{
  // can select layer
  const store = createStore(mappoState)

  store.dispatch({type: `SELECT_LAYER`, index: 1})
  expect(store.getState().selectedTileLayerIndex).toBe(1)

  store.dispatch({type: `SELECT_LAYER`, index: 0})
  expect(store.getState().selectedTileLayerIndex).toBe(0)
}

{
  // can toggle layer visibility
  const store = createStore(mappoState)

  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 0})
  expect(store.getState().layerHidden[0]).toBe(true)

  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 0})
  expect(store.getState().layerHidden[0]).toBe(false)
}

{
  // can select tile
  const store = createStore(mappoState)

  store.dispatch({type: `SELECT_TILESET_TILE`, index: 1})
  expect(store.getState().selectedTileIndex).toBe(1)

  store.dispatch({type: `SELECT_TILESET_TILE`, index: 0})
  expect(store.getState().selectedTileIndex).toBe(0)
}

{
  // can highlight map tile
  const store = createStore(mappoState)

  store.dispatch({type: `HIGHLIGHT_MAP_TILE`, tileX: 1, tileY: 2})
  expect(store.getState().highlightedMapTile).toEqual({tileX: 1, tileY: 2})

  store.dispatch({type: `HIGHLIGHT_MAP_TILE`, tileX: 3, tileY: 4})
  expect(store.getState().highlightedMapTile).toEqual({tileX: 3, tileY: 4})
}

{
  // SET_MAP holds a direct reference to the map
  const store = createStore(mappoState)
  expect(store.getState()).toEqual({})

  const map = {tileLayers: []}
  store.dispatch({type: `SET_MAP`, map})
  expect(store.getState().map).toBe(map)
}

{
  // can plot a tile
  const store = createStore(mappoState)

  const tileLayers = [{width: 2, height: 2, tileIndexGrid: filler(2 * 2, 77)}]
  deepFreeze(tileLayers)
  store.dispatch({type: `SET_MAP`, map: {tileLayers}})
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual(filler(2 * 2, 77))

  const plotInfo = {
    x: 0,
    y: 1,
    tileIndexGridWidth: 2,
    tileLayerIndex: 0,
    tileLayers,
    tileIndexToPlot: 99,
  }
  store.dispatch(Object.assign({type: `PLOT_TILE`}, plotInfo))
  expect(store.getState().map.tileLayers[0].tileIndexGrid).toEqual([77, 77, 99, 77])
  expect(store.getState().plots.present).toEqual([{
    x: 0,
    y: 1,
    tileIndexGridWidth: 2,
    tileLayerIndex: 0,
    tileIndexToPlot: 99,
    overwritingTileIndex: 77,
  }])
  expect(store.getState().isMapDirty).toBe(true)
}

{
  // can move camera
  const store = createStore(mappoState)

  store.dispatch({type: `MOVE_CAMERA`, x: 2, y: 3})
  expect(store.getState().camera).toEqual({x: 2, y: 3})

  store.dispatch({type: `MOVE_CAMERA`, x: 4, y: 5})
  expect(store.getState().camera).toEqual({x: 4, y: 5})
}

{
  // can set editor window size
  const store = createStore(mappoState)

  store.dispatch({type: `SET_EDITOR_WINDOW_SIZE`, width: 200, height: 300})
  expect(store.getState().editor.width).toEqual(200)
  expect(store.getState().editor.height).toEqual(300)
}

{
  // can set loading state
  const store = createStore(mappoState)

  store.dispatch({type: `SET_LOADING`, isLoading: true})
  expect(store.getState().isLoading).toBe(true)
}

{
  // can load state
  const store = createStore(mappoState)

  store.dispatch({type: `RELOAD_STORE`, state: {herp: `derp`}})
  expect(store.getState()).toEqual({herp: `derp`})
}

{
  // can set map dirty state
  const store = createStore(mappoState)

  store.dispatch({type: `SET_MAP_DIRTY`, isMapDirty: true})
  expect(store.getState().isMapDirty).toEqual(true)

  store.dispatch({type: `SET_MAP_DIRTY`, isMapDirty: false})
  expect(store.getState().isMapDirty).toEqual(false)
}

{
  // can set zoom level
  const store = createStore(mappoState)

  store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: 0})
  expect(store.getState().zoomLevel).toBe(0)

  store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: 4})
  expect(store.getState().zoomLevel).toBe(4)
}
