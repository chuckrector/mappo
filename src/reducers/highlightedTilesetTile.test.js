"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const highlightedTilesetTile = require(`./highlightedTilesetTile`)
const {hoverTilesetTile} = require(`../actions/index`)

{
  // can highlight map tile
  const store = createStore(highlightedTilesetTile)

  store.dispatch(hoverTilesetTile({x: 1, y: 2, index: 3}))
  expect(store.getState()).toEqual({x: 1, y: 2, index: 3})

  store.dispatch(hoverTilesetTile({x: 3, y: 4, index: 5}))
  expect(store.getState()).toEqual({x: 3, y: 4, index: 5})
}
