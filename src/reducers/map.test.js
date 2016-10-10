"use strict"

const {fromJS, Map} = require(`immutable`)
const expect = require(`expect`)
const map = require(`./map`)
const {plotTile} = require(`../actions/index`)

{
  // can plot to layer in map
  const tileLayers = fromJS([
    {width: 2, height: 2, tileIndexGrid: [1, 1, 1, 1]},
    {width: 2, height: 2, tileIndexGrid: [2, 2, 2, 2]},
  ])
  let newMap = map(Map({tileLayers}), plotTile({
    x: 0,
    y: 1,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
    tileLayers,
  }))
  expect(newMap).toEqual(fromJS({
    tileLayers: [
      {width: 2, height: 2, tileIndexGrid: [1, 1, 1, 1]},
      {width: 2, height: 2, tileIndexGrid: [2, 2, 99, 2]},
    ],
  }))

  newMap = map(newMap, plotTile({
    x: 1,
    y: 1,
    tileIndexToPlot: 88,
    tileLayerIndex: 0,
    tileLayers,
  }))
  expect(newMap).toEqual(fromJS({
    tileLayers: [
      {width: 2, height: 2, tileIndexGrid: [1, 1, 1, 88]},
      {width: 2, height: 2, tileIndexGrid: [2, 2, 99, 2]},
    ],
  }))
}
