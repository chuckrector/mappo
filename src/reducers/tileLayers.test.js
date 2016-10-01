"use strict"

const expect = require(`expect`)
const tileLayers = require(`./tileLayers`)

{
  // can plot tile to specific layers
  let newTileLayers = tileLayers([
    {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 1]},
    {w: 2, h: 2, tileIndexGrid: [2, 2, 2, 2]},
  ], {
    type: `PLOT_TILE`,
    x: 0,
    y: 1,
    tileIndexGridWidth: 2,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
  })
  expect(newTileLayers).toEqual([
    {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 1]},
    {w: 2, h: 2, tileIndexGrid: [2, 2, 99, 2]},
  ])

  newTileLayers = tileLayers(newTileLayers, {
    type: `PLOT_TILE`,
    x: 1,
    y: 1,
    tileIndexGridWidth: 2,
    tileIndexToPlot: 88,
    tileLayerIndex: 0,
  })
  expect(newTileLayers).toEqual([
    {w: 2, h: 2, tileIndexGrid: [1, 1, 1, 88]},
    {w: 2, h: 2, tileIndexGrid: [2, 2, 99, 2]},
  ])
}

