"use strict"

const colorDepth = require(`./converter/colorDepth`)
const createTileGridConverter = require(`./converter/createTileGridConverter`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = ({context, tileset, imageFilename}) => {
  const mappoTileset = {}

  switch (tileset.formatName) {
    case `v1vsp`: {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.numTiles = tileset.numtiles
    } break;
    case `v2vsp`: {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.numTiles = tileset.numtiles
    } break;

    case `v27vsp8bit`: {
      mappoTileset.tileWidth = tileset.tileWidth
      mappoTileset.tileHeight = tileset.tileHeight
      mappoTileset.numTiles = tileset.numTiles
    } break

    case `v27vsp32bit`: {
      mappoTileset.tileWidth = tileset.tileWidth
      mappoTileset.tileHeight = tileset.tileHeight
      mappoTileset.numTiles = tileset.numTiles
    } break

    case `v3vsp`: {
      mappoTileset.tileWidth = tileset.tilesize
      mappoTileset.tileHeight = tileset.tilesize
      mappoTileset.numTiles = tileset.numtiles
    } break;
  }

  mappoTileset.imageFilename = imageFilename
  mappoTileset.tileColumns = 20

  return mappoTileset
}
