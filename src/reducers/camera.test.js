"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const camera = require(`./camera`)
const {Map} = require(`immutable`)

{
  // can move camera
  const store = createStore(camera)

  store.dispatch({type: `MOVE_CAMERA`, x: 2, y: 3})
  expect(store.getState()).toEqual(Map({x: 2, y: 3}))

  store.dispatch({type: `MOVE_CAMERA`, x: 4, y: 5})
  expect(store.getState()).toEqual(Map({x: 4, y: 5}))
}

