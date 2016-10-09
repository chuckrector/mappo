"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)

{
  // can select layer
  const store = createStore(selectedTileLayerIndex)

  store.dispatch({type: `SELECT_LAYER`, index: 1})
  expect(store.getState()).toBe(1)

  store.dispatch({type: `SELECT_LAYER`, index: 0})
  expect(store.getState()).toBe(0)
}
