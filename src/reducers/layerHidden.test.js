"use strict"

const {List} = require(`immutable`)
const {createStore} = require(`redux`)
const expect = require(`expect`)
const layerHidden = require(`./layerHidden`)
const {resetLayerVisibilities} = require(`../actions/index`)

{
  // can toggle layer visibility
  const store = createStore(layerHidden)

  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 0})
  expect(store.getState().get(0)).toBe(true)

  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 0})
  expect(store.getState().get(0)).toBe(false)
}

{
  // can reset layer visibilities
  const store = createStore(layerHidden)

  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 0})
  store.dispatch({type: `TOGGLE_LAYER_VISIBILITY`, index: 1})
  expect(store.getState().slice(0, 2)).toEqual(List([true, true]))
  store.dispatch(resetLayerVisibilities())
  expect(store.getState().slice(0, 2)).toEqual(List([false, false]))
}
