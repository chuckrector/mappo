"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const windowSize = require(`./windowSize`)
const {setWindowSize} = require(`../actions/index`)

{
  // can set editor window size
  const store = createStore(windowSize)

  store.dispatch(setWindowSize({width: 200, height: 300}))
  expect(store.getState()).toEqual({width: 200, height: 300})
}
