"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const isMapLoading = require(`./isMapLoading`)
const {setMapLoading} = require(`../actions/index`)

{
  // can set loading state
  const store = createStore(isMapLoading)

  store.dispatch(setMapLoading(true))
  expect(store.getState()).toBe(true)

  store.dispatch(setMapLoading(false))
  expect(store.getState()).toBe(false)
}
