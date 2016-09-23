"use strict"

module.exports = ({map}) => {
  const mappoMap = {}

  switch (map.formatName) {
    case 'v1map': {
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
