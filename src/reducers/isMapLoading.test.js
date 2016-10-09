"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const isMapLoading = require(`./isMapLoading`)

{
  // can set loading state
  const store = createStore(isMapLoading)

  store.dispatch({type: `SET_MAP_LOADING`, isMapLoading: true})
  expect(store.getState()).toBe(true)

  store.dispatch({type: `SET_MAP_LOADING`, isMapLoading: false})
  expect(store.getState()).toBe(false)
}
