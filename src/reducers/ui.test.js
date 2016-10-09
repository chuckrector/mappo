"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const ui = require(`./ui`)

{
  // can set zoom level
  const store = createStore(ui)

  store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: 0})
  expect(store.getState().zoomLevel).toBe(0)

  store.dispatch({type: `SET_ZOOM_LEVEL`, zoomLevel: 4})
  expect(store.getState().zoomLevel).toBe(4)
}
