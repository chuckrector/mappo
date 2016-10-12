"use strict"

const {createStore} = require(`redux`)
const expect = require(`expect`)
const recentMapFilename = require(`./recentMapFilename`)
const {saveRecentMapFilename} = require(`../actions/index`)

{
  // can save recent map filename
  const store = createStore(recentMapFilename)

  store.dispatch(saveRecentMapFilename(`bumville.map`))
  expect(store.getState()).toBe(`bumville.map`)
}

