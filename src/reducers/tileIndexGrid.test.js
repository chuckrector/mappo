"use strict"

const expect = require(`expect`)
const tileIndexGrid = require(`./tileIndexGrid`)

{
  // can plot tile
  const action = {type: `PLOT_TILE`, x: 0, y: 1, tileIndexGridWidth: 2, tileIndexToPlot: 99}
  expect(tileIndexGrid([0, 0, 0, 0], action)).toEqual([0, 0, 99, 0])
}
