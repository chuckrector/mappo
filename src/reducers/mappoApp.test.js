"use strict"

const {fromJS, List, Map} = require(`immutable`)
const expect = require(`expect`)
const deepFreeze = require(`deep-freeze`)
const filler = require(`../filler`)
const {createStore} = require(`redux`)
const mappoApp = require(`./mappoApp`)
const {plotTile, setMap} = require(`../actions/index`)

{
  // can set map
  const store = createStore(mappoApp)

  store.dispatch(setMap(Map({tileLayers: []})))
  expect(store.getState().session.map).toEqual(Map({tileLayers: []}))
}

{
  // SET_MAP holds a direct reference to the map
  const store = createStore(mappoApp)

  const map = Map({tileLayers: []})
  store.dispatch(setMap(map))
  expect(store.getState().session.map).toBe(map)
}

{
  // can plot a tile
  const store = createStore(mappoApp)

  const tileLayers = fromJS([{width: 2, height: 2, tileIndexGrid: filler(2 * 2, 77)}])
  deepFreeze(tileLayers)
  store.dispatch(setMap(Map({tileLayers})))
  expect(store.getState().session.map.getIn([`tileLayers`, `0`, `tileIndexGrid`])).toEqual(List(filler(2 * 2, 77)))

  store.dispatch(plotTile({
    x: 0,
    y: 1,
    tileLayerIndex: 0,
    tileLayers,
    tileIndexToPlot: 99,
  }))
  expect(store.getState().session.map.getIn([`tileLayers`, `0`, `tileIndexGrid`])).toEqual(List([77, 77, 99, 77]))
  const plots = store.getState().session.plots
  const plotHistory = plots.get(`plotHistory`)
  const undoIndex = plots.get(`undoIndex`)
  const expectedPlot = Map({
    x: 0,
    y: 1,
    l: 0,
    v: 99,
    o: 77,
  })
  // TODO(chuck): figure out what's up here. they are identical, but expect()
  // fails and the JSON output shows the "l" and "v" keys in a swapped order.
  // isn't immutable.js supposed to be smart about this?
  expect(plotHistory.get(undoIndex - 1).equals(expectedPlot)).toBe(true)
}


