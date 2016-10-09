"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const camera = require(`./camera`)

{
  // can move camera
  const store = createStore(camera)

  store.dispatch({type: `MOVE_CAMERA`, x: 2, y: 3})
  expect(store.getState()).toEqual({x: 2, y: 3})

  store.dispatch({type: `MOVE_CAMERA`, x: 4, y: 5})
  expect(store.getState()).toEqual({x: 4, y: 5})
}

