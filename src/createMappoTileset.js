"use strict"

const colorDepth = require('./converter/colorDepth')

module.exports = ({tileset}) => {
  const mappoTileset = {}

  switch (tileset.formatName) {
    case 'v1vsp': {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.numTiles = tileset.numtiles
      mappoTileset.raw32bitData = colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.vsp0,
      })
    } break;
    case 'v2vsp': {
      mappoTileset.tileWidth = 16
      mappoTileset.tileHeight = 16
      mappoTileset.numTiles = tileset.numtiles
      mappoTileset.raw32bitData = colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.imagedata.decompressed,
      })
    } break;
    case 'v3vsp': {
      mappoTileset.tileWidth = tileset.tilesize
      mappoTileset.tileHeight = tileset.tilesize
      mappoTileset.numTiles = tileset.numtiles
      mappoTileset.raw32bitData = colorDepth.convert24to32({
        raw24bitData: tileset.tiledatabuf.decompressed,
      })
    } break;
  }

  return mappoTileset
}
