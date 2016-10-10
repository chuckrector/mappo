"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const selectedTileIndex = require(`./selectedTileIndex`)
const {selectTilesetTile} = require(`../actions/index`)

{
  // can select tileset tile
  const store = createStore(selectedTileIndex)

  store.dispatch(selectTilesetTile(1))
  expect(store.getState()).toBe(1)

  store.dispatch(selectTilesetTile(0))
  expect(store.getState()).toBe(0)
}
