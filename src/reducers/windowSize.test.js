"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const windowSize = require(`./windowSize`)

{
  // can set editor window size
  const store = createStore(windowSize)

  store.dispatch({type: `SET_WINDOW_SIZE`, width: 200, height: 300})
  expect(store.getState()).toEqual({width: 200, height: 300})
}
