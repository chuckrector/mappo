"use strict"

module.exports = ({map, tileset, camera, canvas, context}) => {
  map.mapLayerOrder.forEach(layerIndex => {
    // TODO(chuck): more holistic mapLayerOrder vetting? v2/pyramid.map refers
    //              to a map layer which doesn't exist
    const tileLayer = map.tileLayers[layerIndex]
    if (!tileLayer.isHidden) {
      renderLayer({
        context,
        canvas,
        tileset,
        layer: tileLayer,
        x: camera.x * tileLayer.parallax.x,
        y: camera.y * tileLayer.parallax.y,
        transparent: layerIndex > 0,
      })
    }
  })
}
