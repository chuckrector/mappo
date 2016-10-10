"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const camera = require(`./camera`)
const {Map} = require(`immutable`)
const {moveCamera} = require(`../actions/index`)

{
  // can move camera
  const store = createStore(camera)

  store.dispatch(moveCamera({x: 2, y: 3}))
  expect(store.getState()).toEqual(Map({x: 2, y: 3}))

  store.dispatch(moveCamera({x: 4, y: 5}))
  expect(store.getState()).toEqual(Map({x: 4, y: 5}))
}

