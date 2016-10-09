"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const highlightedMapTile = require(`./highlightedMapTile`)

{
  // can highlight map tile
  const store = createStore(highlightedMapTile)

  store.dispatch({type: `HIGHLIGHT_MAP_TILE`, tileX: 1, tileY: 2})
  expect(store.getState()).toEqual({tileX: 1, tileY: 2})

  store.dispatch({type: `HIGHLIGHT_MAP_TILE`, tileX: 3, tileY: 4})
  expect(store.getState()).toEqual({tileX: 3, tileY: 4})
}
