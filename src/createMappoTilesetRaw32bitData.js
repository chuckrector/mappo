"use strict"

const colorDepth = require(`./converter/colorDepth`)

module.exports = (tileset) => {
  const mappoTileset = {}

  switch (tileset.formatName) {
    case `v1vsp`: {
      return colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.vsp0,
      })
    } break

    case `v2vsp`: {
      return colorDepth.convert8to32({
        palette: tileset.palette.map(v => v * 4),
        raw8bitData: tileset.imagedata.decompressed,
      })
    } break

    case `v27vsp8bit`: {
      return colorDepth.convert8to32({
        palette: tileset.palette,
        raw8bitData: tileset.imageData.decompressed,
      })
    } break

    case `v27vsp32bit`: {
      return tileset.imageData.decompressed
    } break

    case `v3vsp`: {
      return colorDepth.convert24to32({
        raw24bitData: tileset.tiledatabuf.decompressed,
      })
    } break
  }
}
