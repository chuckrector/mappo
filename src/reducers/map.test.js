"use strict"

const expect = require(`expect`)
const map = require(`./map`)

{
  // can plot to layer in map
  let newMap = map({
    tileLayers: [
      {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 1]},
      {w: 2, h: 2, tileIndexGrid: [2, 2, 2, 2]},
    ],
  }, {
    type: `PLOT_TILE`,
    x: 0,
    y: 1,
    tileIndexGridWidth: 2,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
  })
  expect(newMap).toEqual({
    tileLayers: [
      {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 1]},
      {w: 2, h: 2, tileIndexGrid: [2, 2, 99, 2]},
    ],
  })

  newMap = map(newMap, {
    type: `PLOT_TILE`,
    x: 1,
    y: 1,
    tileIndexGridWidth: 2,
    tileIndexToPlot: 88,
    tileLayerIndex: 0,
  })
  expect(newMap).toEqual({
    tileLayers: [
      {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 88]},
      {w: 2, h: 2, tileIndexGrid: [2, 2, 99, 2]},
    ],
  })
}
