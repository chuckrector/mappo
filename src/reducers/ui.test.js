"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const ui = require(`./ui`)
const {setZoomLevel} = require(`../actions/index`)

{
  // can set zoom level
  const store = createStore(ui)

  store.dispatch(setZoomLevel(0))
  expect(store.getState().zoomLevel).toBe(0)

  store.dispatch(setZoomLevel(4))
  expect(store.getState().zoomLevel).toBe(4)
}
