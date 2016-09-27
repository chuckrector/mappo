"use strict"

const expect = require(`expect`)
const filler = require(`./filler`)
const createStore = require(`./createStore`)
const mappoState = require(`./mappoState`)

{
  // can undo set map
  const store = createStore(mappoState)

  expect(store.getState()).toEqual({})

  store.dispatch({type: `SET_MAP`, tileLayers: []})

  expect(store.getState()).toEqual({map: {tileLayers: []}})
}
