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
  // can detect invalid mappo tilesets
  const wrongFormat = JSON.stringify(``)
  const wrongFormatResult = validateFormat({
    data: wrongFormat,
    expectedFormat: `mappotileset`,
  })
  expect(wrongFormatResult).toEqual({
    ok: false,
    errors: [`*error* mappotileset: detected format is unknown`],
  })

  const missingRequiredFields = JSON.stringify({
    signature: {
      name: `mappo tileset`,
      version: `0.1.0`,
    },
  })
  const missingRequiredFieldsResult = validateFormat({
    data: missingRequiredFields,
    expectedFormat: `mappotileset`,
  })
  expect(missingRequiredFieldsResult).toEqual({
    ok: false,
    errors: [
      `*error* mappotileset: missing "description" field`,
      `*error* mappotileset: missing "imageFilename" field`,
      `*error* mappotileset: missing "tileWidth" field`,
      `*error* mappotileset: missing "tileHeight" field`,
      `*error* mappotileset: missing "tileCount" field`,
      `*error* mappotileset: missing "tileColumns" field`,
    ],
  })

  const wrongTypes = JSON.stringify({
    signature: {
      name: `mappo tileset`,
      version: `0.1.0`,
    },
    description: 123,
    imageFilename: [],
    tileWidth: "derp",
    tileHeight: {},
    tileCount: "foo",
    tileColumns: "bar",
  })
  const wrongTypesResult = validateFormat({
    data: wrongTypes,
    expectedFormat: `mappotileset`,
  })
  expect(wrongTypesResult).toEqual({
    ok: false,
    errors: [
      `*error* mappotileset: expected "description" to be a "string" but found "number": 123`,
      `*error* mappotileset: expected "imageFilename" to be a "string" but found "object": `,
      `*error* mappotileset: expected "tileWidth" to be a "number" but found "string": derp`,
      `*error* mappotileset: expected "tileHeight" to be a "number" but found "object": [object Object]`,
      `*error* mappotileset: expected "tileCount" to be a "number" but found "string": foo`,
      `*error* mappotileset: expected "tileColumns" to be a "number" but found "string": bar`,
    ]
  })
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
