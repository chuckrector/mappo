"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const selectedTileIndex = require(`./selectedTileIndex`)

{
  // can select tileset tile
  const store = createStore(selectedTileIndex)

  store.dispatch({type: `SELECT_TILESET_TILE`, index: 1})
  expect(store.getState()).toBe(1)

  store.dispatch({type: `SELECT_TILESET_TILE`, index: 0})
  expect(store.getState()).toBe(0)
}
