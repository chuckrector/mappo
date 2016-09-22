"use strict"

module.exports = ({map}) => {
  const mappoMap = {}

  if (map.formatName === 'v1map') {
    mappoMap.width = map.xsize
    mappoMap.height = map.ysize
    mappoMap.tileLayers = [
      {description: 'Background', tileIndexGrid: map.map0},
      {description: 'Foreground', tileIndexGrid: map.map1},
    ]
  }

  return mappoMap
}
