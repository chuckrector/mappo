"use strict"

const expect = require(`expect`)
const plotHistory = require(`./plotHistory`)
const {createStore} = require(`redux`)
const plots = require(`./plots`)

{
  // can undo & redo tile plots
  const store = createStore(plotHistory(plots))
  const tileLayers = [
    {width: 2, tileIndexGrid: [77, 77, 77, 77]},
    {width: 2, tileIndexGrid: [88, 88, 88, 88]},
  ]

  store.dispatch({type: `PLOT_TILE`, x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers})
  store.dispatch({type: `PLOT_TILE`, x: 1, y: 1, tileIndexToPlot: 66, tileLayerIndex: 1, tileLayers})

  const expectedPlotList = [
    {x: 0, y: 1, v: 99, l: 0, o: 77},
    {x: 1, y: 1, v: 66, l: 1, o: 88},
  ]
  expect(store.getState()).toEqual({plotHistory: expectedPlotList, undoIndex: 2})

  store.dispatch({type: `UNDO`})
  expect(store.getState()).toEqual({plotHistory: expectedPlotList, undoIndex: 1})

  store.dispatch({type: `REDO`})
  expect(store.getState()).toEqual({plotHistory: expectedPlotList, undoIndex: 2})
}

{
  // redo in middle of undo list truncates it
  const store = createStore(plotHistory(plots))
  const tileLayers = [
    {width: 2, tileIndexGrid: [77, 77, 77, 77]},
    {width: 2, tileIndexGrid: [88, 88, 88, 88]},
  ]

  store.dispatch({type: `PLOT_TILE`, x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers})
  store.dispatch({type: `PLOT_TILE`, x: 1, y: 1, tileIndexToPlot: 66, tileLayerIndex: 1, tileLayers})

  const expectedPlotList = [
    {x: 0, y: 1, v: 99, l: 0, o: 77},
    {x: 1, y: 1, v: 66, l: 1, o: 88},
  ]
  expect(store.getState()).toEqual({plotHistory: expectedPlotList, undoIndex: 2})

  store.dispatch({type: `UNDO`})
  expect(store.getState()).toEqual({plotHistory: expectedPlotList, undoIndex: 1})

  store.dispatch({type: `PLOT_TILE`, x: 1, y: 0, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers})

  expect(store.getState()).toEqual({
    plotHistory: [
      {x: 0, y: 1, v: 99, l: 0, o: 77},
      {x: 1, y: 0, v: 99, l: 0, o: 77},
    ],
    undoIndex: 2,
  })
}
