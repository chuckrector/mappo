"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const highlightedMapTile = require(`./highlightedMapTile`)
const {highlightMapTile} = require(`../actions/index`)

{
  // can highlight map tile
  const store = createStore(highlightedMapTile)

  store.dispatch(highlightMapTile({x: 1, y: 2}))
  expect(store.getState()).toEqual({x: 1, y: 2})

  store.dispatch(highlightMapTile({x: 3, y: 4}))
  expect(store.getState()).toEqual({x: 3, y: 4})
}
