"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const selectedTilesetTile = require(`./selectedTilesetTile`)
const {selectTilesetTile} = require(`../actions/index`)

{
  // can select tileset tile
  const store = createStore(selectedTilesetTile)

  store.dispatch(selectTilesetTile({x: 0, y: 1, index: 2}))
  expect(store.getState()).toEqual({x: 0, y: 1, index: 2})

  store.dispatch(selectTilesetTile({x: 2, y: 3, index: 4}))
  expect(store.getState()).toEqual({x: 2, y: 3, index: 4})
}
