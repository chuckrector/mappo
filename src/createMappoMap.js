"use strict"

module.exports = ({map}) => {
  const mappoMap = {}

  const parseRenderString = (renderString, separator='') => {
    const parts = renderString.split(separator)
    const layerReferences = parts.filter(part => /\d/.test(part))
    const layerIndices = layerReferences.map(Number).map(v => v - 1)
    return layerIndices
  }

  switch (map.formatName) {
    case 'v1map': {
      mappoMap.mapLayerOrder = [0, 1]
      mappoMap.tilesetFilename = map.vsp0name
      mappoMap.tileLayers = [{
        description: 'Background',
        width: map.xsize,
        height: map.ysize,
        tileIndexGrid: map.map0,
        parallax: {
          x: 1.0,
          y: 1.0,
        },
      }, {
        description: 'Foreground',
        width: map.xsize,
        height: map.ysize,
        tileIndexGrid: map.map1,
        parallax: {
          x: map.pmultx / map.pdivx,
          y: map.pmultx / map.pdivx,
        },
      }]
    } break;
    case 'v2map': {
      mappoMap.mapLayerOrder = parseRenderString(map.rstring)
      mappoMap.tilesetFilename = map.vspname
      mappoMap.tileLayers = map.layers.map((tileIndexGrid, index) => {
        const layer = map.layer[index]
        return {
          description: 'Layer #' + index,
          width: layer.sizex,
          height: layer.sizey,
          tileIndexGrid: tileIndexGrid.decompressed,
          parallax: {
            x: layer.pmultx / layer.pdivx,
            y: layer.pmulty / layer.pdivy,
          },
        }
      })
    } break;
    case 'v3map': {
      mappoMap.mapLayerOrder = parseRenderString(map.renderstring, ',')
      mappoMap.tilesetFilename = map.vspname
      mappoMap.tileLayers = map.layers.map(layerInfo => ({
        description: layerInfo.layername,
        width: layerInfo.width,
        height: layerInfo.height,
        tileIndexGrid: layerInfo.tiledata.decompressed,
        parallax: {
          x: layerInfo.parallax_x,
          y: layerInfo.parallax_y,
        },
      }))
    } break;
  }

  return mappoMap
}
