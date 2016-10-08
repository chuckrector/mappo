"use strict"

const expect = require(`expect`)
const tileIndexGrid = require(`./tileIndexGrid`)

{
  // can plot tile
  const action = {type: `PLOT_TILE`, x: 0, y: 1, tileIndexToPlot: 99, tileLayerIndex: 0, tileLayers: [{
    width: 2, tileIndexGrid: [0, 0, 0, 0],
  }]}
  expect(tileIndexGrid([0, 0, 0, 0], action)).toEqual([0, 0, 99, 0])
}
