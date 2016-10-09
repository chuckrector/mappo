"use strict"

const {fromJS, List} = require(`immutable`)
const expect = require(`expect`)
const tileIndexGrid = require(`./tileIndexGrid`)

{
  // can plot tile
  const tileLayers = fromJS([
    {width: 2, tileIndexGrid: [0, 0, 0, 0]},
  ])
  const action = {type: `PLOT_TILE`, x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers}
  expect(tileIndexGrid(List([0, 0, 0, 0]), action)).toEqual(List([0, 0, 99, 0]))
}
