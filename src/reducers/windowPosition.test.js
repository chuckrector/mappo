"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const windowPosition = require(`./windowPosition`)
const {setWindowPosition} = require(`../actions/index`)

{
  // can set editor window size
  const store = createStore(windowPosition)

  store.dispatch(setWindowPosition({x: 200, y: 300}))
  expect(store.getState()).toEqual({x: 200, y: 300})
}
