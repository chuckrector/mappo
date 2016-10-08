"use strict"

const expect = require(`expect`)
const tileLayers = require(`./tileLayers`)

{
  // can plot tile to specific layers
  const layers = [
    {width:2, height: 2, tileIndexGrid: [1, 1, 1, 1]},
    {width:2, height: 2, tileIndexGrid: [2, 2, 2, 2]},
  ]
  let newTileLayers = tileLayers(layers, {
    type: `PLOT_TILE`,
    x: 0,
    y: 1,
    tileIndexToPlot: 99,
    tileLayerIndex: 1,
    tileLayers: layers,
  })
  expect(newTileLayers).toEqual([
    {width:2, height: 2, tileIndexGrid: [1, 1, 1, 1]},
    {width:2, height: 2, tileIndexGrid: [2, 2, 99, 2]},
  ])

  newTileLayers = tileLayers(newTileLayers, {
    type: `PLOT_TILE`,
    x: 1,
    y: 1,
    tileIndexToPlot: 88,
    tileLayerIndex: 0,
    tileLayers: layers,
  })
  expect(newTileLayers).toEqual([
    {width:2, height: 2, tileIndexGrid: [1, 1, 1, 88]},
    {width:2, height: 2, tileIndexGrid: [2, 2, 99, 2]},
  ])
}

