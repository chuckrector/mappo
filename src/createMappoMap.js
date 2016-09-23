"use strict"

module.exports = ({map}) => {
  const mappoMap = {}

  switch (map.formatName) {
    case 'v1map': {
      mappoMap.tileLayers = [
        {description: 'Background', width: map.xsize, height: map.ysize, tileIndexGrid: map.map0},
        {description: 'Foreground', width: map.xsize, height: map.ysize, tileIndexGrid: map.map1},
      ]
    } break;
    case 'v2map': {
      mappoMap.tileLayers = map.layers.map((tileIndexGrid, index) => {
        const layer = map.layer[index]
        return {
          description: 'Layer #' + index,
          width: layer.sizex,
          height: layer.sizey,
          tileIndexGrid: tileIndexGrid.decompressed,
        }
      })
    } break;
    case 'v3map': {
      mappoMap.tileLayers = map.layers.map(layerInfo => ({
        description: layerInfo.layername,
        width: layerInfo.width,
        height: layerInfo.height,
        tileIndexGrid: layerInfo.tiledata.decompressed,
      }))
    } break;
  }

  return mappoMap
}
