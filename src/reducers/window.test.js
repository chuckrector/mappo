"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const window = require(`./window`)
const {setWindowSize} = require(`../actions/index`)
const {setWindowPosition} = require(`../actions/index`)

{
  // can set editor window size
  const store = createStore(window)

  store.dispatch(setWindowSize({width: 200, height: 300}))
  expect(store.getState()).toEqual({width: 200, height: 300})
}

{
  // can set editor window position
  const store = createStore(window)

  store.dispatch(setWindowPosition({x: 200, y: 300}))
  expect(store.getState()).toEqual({x: 200, y: 300})
}

