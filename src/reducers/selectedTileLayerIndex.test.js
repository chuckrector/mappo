"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const selectedTileLayerIndex = require(`./selectedTileLayerIndex`)
const {selectLayer} = require(`../actions/index`)

{
  // can select layer
  const store = createStore(selectedTileLayerIndex)

  store.dispatch(selectLayer(1))
  expect(store.getState()).toBe(1)

  store.dispatch(selectLayer(0))
  expect(store.getState()).toBe(0)
}
