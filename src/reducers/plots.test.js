"use strict"

const {fromJS, List, Map} = require(`immutable`)
const expect = require(`expect`)
const {createStore} = require(`redux`)
const plots = require(`./plots`)

{
  // can add plot
  const store = createStore(plots)
  expect(store.getState()).toEqual(List([]))

  const tileLayers = fromJS([
    {width: 2, tileIndexGrid: [0, 0, 0, 0]},
    {width: 2, tileIndexGrid: [1, 1, 1, 1]},
  ])

  store.dispatch({
    type: `PLOT_TILE`,
    x: 0,
    y: 1,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
    tileLayers,
  })

  const expectedPlot = Map({x: 0, y: 1, v: 99, l: 1, o: 1})
  const expectedPlots = List([expectedPlot])
  expect(store.getState()).toEqual(expectedPlots)
}
