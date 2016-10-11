"use strict"

const expect = require(`expect`)
const validateFormat = require(`./validateFormat`)

{
  // can validate mappo tileset
  const json = JSON.stringify({
    signature: {
      name: `mappo tileset`,
      version: `0.1.0`,
    },
    description: `cool tileset`,
    imageFilename: `hahn01.vsp.png`,
    tileWidth: 16,
    tileHeight: 16,
    tileCount: 23,
    tileColumns: 20,
  })
  const result = validateFormat({data: json, expectedFormat: `mappotileset`})
  expect(result.errors).toBe(undefined)
  expect(result.ok).toBe(true)
}

{
  // can validate mappo map
  const json = JSON.stringify({
    signature: {
      name: `mappo map`,
      version: `0.1.0`,
    },
    description: `cool map`,
    tilesetFilename: `hahn01.vsp.json`,
    layerOrder: [0, 1],
    layers: [],
  })
  const result = validateFormat({data: json, expectedFormat: `mappomap`})
  expect(result.errors).toBe(undefined)
  expect(result.ok).toBe(true)
}
