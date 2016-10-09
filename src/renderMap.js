"use strict"

const {List} = require(`immutable`)

module.exports = ({
  map,
  tileset,
  tilesetImageBitmap,
  camera,
  canvas,
  context,
  layerHidden,
}) => {
  const tileStartList = []
  map.get(`mapLayerOrder`).forEach(layerIndex => {
    // TODO(chuck): more holistic mapLayerOrder vetting? v2/pyramid.map refers
    //              to a map layer which doesn't exist
    const tileLayer = map.getIn([`tileLayers`, `${layerIndex}`])
    const isHidden = layerHidden && layerHidden.get(layerIndex)
    if (tileLayer && !isHidden) {
      tileStartList[layerIndex] = renderLayer({
        context,
        canvas,
        tileset,
        tilesetImageBitmap,
        layer: tileLayer,
        x: camera.get(`x`) * tileLayer.getIn([`parallax`, `x`]),
        y: camera.get(`y`) * tileLayer.getIn([`parallax`, `y`]),
        transparent: layerIndex > 0,
      })
    }
  })

  return List(tileStartList)
}
