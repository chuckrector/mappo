"use strict"

const {fromJS, List, Map} = require(`immutable`)
const expect = require(`expect`)
const plotHistory = require(`./plotHistory`)
const {createStore} = require(`redux`)
const plots = require(`./plots`)
const {plotTile, redo, undo} = require(`../actions/index`)

{
  // can undo & redo tile plots
  const undoablePlots = plotHistory(plots)
  const store = createStore(undoablePlots)
  const tileLayers = fromJS([
    {width: 2, tileIndexGrid: [77, 77, 77, 77]},
    {width: 2, tileIndexGrid: [88, 88, 88, 88]},
  ])

  store.dispatch(plotTile({x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers}))
  store.dispatch(plotTile({x: 1, y: 1, tileIndexToPlot: 66, tileLayerIndex: 1, tileLayers}))

  const expectedPlotList = fromJS([
    {x: 0, y: 1, v: 99, l: 0, o: 77},
    {x: 1, y: 1, v: 66, l: 1, o: 88},
  ])
  expect(store.getState()).toEqual(Map({plotHistory: expectedPlotList, undoIndex: 2}))

  store.dispatch(undo())
  expect(store.getState()).toEqual(Map({plotHistory: expectedPlotList, undoIndex: 1}))

  store.dispatch(redo())
  expect(store.getState()).toEqual(Map({plotHistory: expectedPlotList, undoIndex: 2}))
}

{
  // plot in middle of undo list truncates redo
  const store = createStore(plotHistory(plots))
  const tileLayers = fromJS([
    {width: 2, tileIndexGrid: [77, 77, 77, 77]},
    {width: 2, tileIndexGrid: [88, 88, 88, 88]},
  ])

  store.dispatch(plotTile({x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers}))
  store.dispatch(plotTile({x: 1, y: 1, tileIndexToPlot: 66, tileLayerIndex: 1, tileLayers}))

  const expectedPlotList = fromJS([
    {x: 0, y: 1, v: 99, l: 0, o: 77},
    {x: 1, y: 1, v: 66, l: 1, o: 88},
  ])
  expect(store.getState()).toEqual(Map({plotHistory: expectedPlotList, undoIndex: 2}))

  store.dispatch(undo())
  expect(store.getState()).toEqual(Map({plotHistory: expectedPlotList, undoIndex: 1}))

  store.dispatch(plotTile({x: 1, y: 0, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers}))

  const expectedState = fromJS({
    plotHistory: [
      {x: 0, y: 1, v: 99, l: 0, o: 77},
      {x: 1, y: 0, v: 99, l: 0, o: 77},
    ],
    undoIndex: 2,
  })
  expect(store.getState()).toEqual(expectedState)
}
