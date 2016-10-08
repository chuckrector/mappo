"use strict"

const expect = require(`expect`)
const createStore = require(`../createStore`)
const plots = require(`./plots`)

{
  // can add plot
  const store = createStore(plots)
  expect(store.getState()).toEqual([])

  const tileLayers = [
    {width: 2, tileIndexGrid: [0, 0, 0, 0]},
    {width: 2, tileIndexGrid: [1, 1, 1, 1]},
  ]

  store.dispatch({
    type: `PLOT_TILE`,
    x: 0,
    y: 1,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
    tileLayers,
  })

  expect(store.getState()).toEqual([{
    x: 0,
    y: 1,
    v: 99,
    l: 1,
    o: 1,
  }])
}
